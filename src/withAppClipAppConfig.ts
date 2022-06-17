import * as fs from "fs";
import * as path from "path";
import plist from "@expo/plist";
import {
  ConfigPlugin,
  InfoPlist,
  withDangerousMod,
} from "@expo/config-plugins";

import { getAppClipBundleIdentifier, getAppClipName } from "./withIosAppClip";

export const withAppClipEntitlements: ConfigPlugin = (config) => {
  return withDangerousMod(config, [
    "ios",
    async (config) => {
      const appBundleIdentifier = config.ios!.bundleIdentifier!;
      const appClipName = getAppClipName(config.modRequest.projectName!);
      const appClipBundleIdentifier = getAppClipBundleIdentifier(
        config.modRequest.projectName!
      );

      config.extra = {
        eas: {
          build: {
            experimental: {
              ios: {
                appExtensions: [
                  {
                    targetName: appClipName,
                    bundleIdentifier: `$(AppIdentifierPrefix)${appClipBundleIdentifier}`,
                    entitlements: {
                      "com.apple.developer.parent-application-identifiers": [
                        `$(AppIdentifierPrefix)${appBundleIdentifier}`,
                      ],
                      "com.apple.developer.on-demand-install-capable": true,
                    },
                  },
                ],
              },
            },
          },
        },
      };

      return config;
    },
  ]);
};