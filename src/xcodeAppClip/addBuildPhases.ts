import { XcodeProject } from "@expo/config-plugins";
import { longComment, PBXFile, quoted } from "./util";

export default function addBuildPhases(
  proj: XcodeProject,
  { groupName, productFile }: { groupName: string; productFile: PBXFile }
) {
  const buildPath = quoted("$(CONTENTS_FOLDER_PATH)/AppClips");

  // Copy files build phase
  const { uuid: copyFilesBuildPhaseUuid, buildPhase: copyFilesBuildPhase } =
    proj.addBuildPhase(
      [productFile.path],
      "PBXCopyFilesBuildPhase",
      groupName,
      proj.getFirstTarget().uuid,
      "watch2_app", // "watch2_app" uses the same subfolder spec (16), app_clip does not exist in cordova-node-xcode yet,
      buildPath
    );
  console.log(`Added PBXCopyFilesBuildPhase ${copyFilesBuildPhaseUuid}`);
}
