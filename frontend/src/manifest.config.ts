import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "../../package.json";

const { version, name, description } = packageJson;
const [major, minor, patch] = version.replace(/[^\d.-]+/g, "").split(/[.-]/);

export default defineManifest(async () => ({
    manifest_version: 3,
    name: name,
    description: description,
    version: `${major}.${minor}.${patch}`,
    version_name: version,
    icons: {
        "16": "frontend/src/assets/icons/icon-16.png",
        "48": "frontend/src/assets/icons/icon-48.png",
        "128": "frontend/src/assets/icons/icon-128.png"
    },
    //side_panel: {
     //   default_path: "src/pages/Panel/PrinciPanel.html",
    //},
    background: {
        service_worker: "frontend/src/pages/background/index.ts",
    },
    action: {
        default_icon: {
            "16": "frontend/src/assets/icons/icon-16.png",
            "48": "frontend/src/assets/icons/icon-48.png",
            "128": "frontend/src/assets/icons/icon-128.png"
        },
        //default_popup: "src/pages/Panel/index.html",
    },
    permissions: ["tabs", "storage", "scripting", "unlimitedStorage", "sidePanel", "activeTab", "windows"] as chrome.runtime.ManifestPermissions[],
    web_accessible_resources: [{
        resources: ["frontend/src/pages/Panel/index.html*"],
        matches: ["http://*/*", "https://*/*"],
        use_dynamic_url: true
    }],
    host_permissions: [
        "http://localhost:5146/*",
        "https://localhost:5146/*",
        "http://127.0.0.1:5146/*",
        "https://127.0.0.1:5146/*"
        ]
}));
