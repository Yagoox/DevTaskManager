import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "../package.json";

const { version, name, description } = packageJson;
const [major, minor, patch] = version.replace(/[^\d.-]+/g, "").split(/[.-]/);

export default defineManifest(async () => ({
    manifest_version: 3,
    name: name,
    description: description,
    version: `${major}.${minor}.${patch}`,
    version_name: version,
    icons: {
        "16": "src/assets/icons/icon-16.png",
        "48": "src/assets/icons/icon-48.png",
        "128": "src/assets/icons/icon-128.png"
    },
    //side_panel: {
     //   default_path: "src/pages/Panel/PrinciPanel.html",
    //},
    background: {
        service_worker: "src/pages/background/index.ts",
    },
    action: {
        default_icon: {
            "16": "src/assets/icons/icon-16.png",
            "48": "src/assets/icons/icon-48.png",
            "128": "src/assets/icons/icon-128.png"
        },
        //default_popup: "src/pages/Panel/index.html",
    },
    permissions: ["tabs", "storage", "scripting", "unlimitedStorage", "sidePanel", "activeTab", "windows"] as chrome.runtime.ManifestPermissions[],
    web_accessible_resources: [{
        resources: ["src/pages/Panel/index.html*"],
        matches: ["http://*/*", "https://*/*"],
        use_dynamic_url: true
    }]
}));
