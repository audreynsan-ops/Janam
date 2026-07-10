<?php

namespace A12s\Composer;

use Composer\DependencyResolver\Operation\InstallOperation;
use Composer\Factory;
use Composer\InstalledVersions;
use Composer\Installer\PackageEvents;
use Composer\IO\ConsoleIO;
use Composer\Script\Event;
use Composer\Installer\PackageEvent;
use Composer\Util\Filesystem;
use Symfony\Component\Finder\Finder;

class CopyPatches {

  /**
   * The list of packages that require copying patches.
   *
   * @var string[]
   */
  protected static array $packages = [];

  /**
   * The filesystem instance.
   *
   * @var \Composer\Util\Filesystem
   */
  protected static Filesystem $filesystem;

  /**
   * Initialize configuration.
   */
  public static function initConfiguration(Event $event): void {
    $io = $event->getIO();
    $composer = $event->getComposer();
    $extra = $composer->getPackage()->getExtra();
    $configuration = $extra['a12s'] ?? [];
    self::$packages = isset($configuration['copy-patches']) && is_array($configuration['copy-patches']) ? array_values($configuration['copy-patches']) : ['aion-solutions/a12sfactory'];

    if ($io->isVerbose()) {
      $io->write('<info>Packages which require copying patches: ' . (self::$packages ? 'none' : implode(', ', self::$packages)) . '.</info>');
    }

    if (self::$packages) {
      $projectRootPath = dirname(Factory::getComposerFile());
      self::getFileSystem()->ensureDirectoryExists($projectRootPath . '/patches');

      foreach (self::$packages as $package) {
        self::processPackage($package, $io);
      }

      // Ensure the required patches are copied before the package is processed
      // by the "composer-patches" plugin.
      $eventDispatcher = $composer->getEventDispatcher();
      $eventDispatcher->addListener(PackageEvents::POST_PACKAGE_INSTALL, [__CLASS__, 'onPackageChange'], 20);
      $eventDispatcher->addListener(PackageEvents::POST_PACKAGE_UPDATE, [__CLASS__, 'onPackageChange'], 20);
    }
  }

  /**
   * React to package installation events.
   *
   * @param \Composer\Installer\PackageEvent $event
   *
   * @throws \ErrorException
   */
  public static function onPackageChange(PackageEvent $event): void {
    $operation = $event->getOperation();

    if (($operation instanceof InstallOperation) && in_array($operation->getPackage()->getName(), self::$packages)) {
      $io = $event->getIO();
      $package = $operation->getPackage();
      $patchesCount = self::processPackage($package->getName(), $io);

      if ($io->isVerbose()) {
        if ($patchesCount) {
          $io->write('<info>Copied ' . $patchesCount . ' patch(es) for ' . $package->getName() . '.</info>');
        }
        else {
          $io->write('<info>No patches to copy for ' . $package->getName() . '.</info>');
        }
      }
    }
  }

  /**
   * Get the filesystem instance.
   *
   * @return \Composer\Util\Filesystem
   */
  protected static function getFileSystem(): Filesystem {
    if (!isset(self::$filesystem)) {
      self::$filesystem = new Filesystem();
    }

    return self::$filesystem;
  }

  /**
   * Copy patches for a given package.
   *
   * @param string $packageName
   *   The name of the package to process.
   * @param \Composer\IO\ConsoleIO $io
   *   The IO instance.
   *
   * @return int
   *   The number of patches copied.
   *
   * @throws \ErrorException
   *   On error copying patches.
   */
  protected static function processPackage(string $packageName, ConsoleIO $io): int {
    $patchesCount = 0;

    try {
      $packagePath = InstalledVersions::getInstallPath($packageName);

      if ($packagePath && is_dir($packagePath . '/patches')) {
        $patchesDir = $packagePath . '/patches';
        $finder = Finder::create()
          ->files()
          ->ignoreVCS(true)
          ->ignoreDotFiles(true)
          ->depth(0)
          ->in($patchesDir);

        if (count($finder) > 0) {
          $rootDir = dirname(Factory::getComposerFile());

          foreach ($finder as $file) {
            self::getFileSystem()->copy($file->getPathname(), $rootDir . '/patches/' . $file->getFilename());
            $patchesCount++;
          }
        }
      }
    }
    catch (\OutOfBoundsException $e) {
      $io->write('<warning>' . $e->getMessage() . '</warning>');
    }

    return $patchesCount;
  }

}
