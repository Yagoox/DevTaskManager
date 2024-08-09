import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "../package.json";

const { version, name, description } = packageJson;

const [major, minor, patch] = version
    .replace(/[^\d.-]+/g, "")
    .split(/[.-]/);

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
        content_scripts: [
            {
                matches: ["http://*/*", "https://*/*"],
                js: ["src/content/index.ts"],
            },
        ],
        background: {
            service_worker: "src/background/index.ts",
        },
        side_panel: {
            default_path: "src/sidepanel/sidepanel.html",
        },
        // action: {
        //     default_popup: "src/popup/popup.html",
        //     default_icon: {
        //     },
        // },
        permissions: ["storage", 
            "sidePanel", 
            "scripting",  
            "tabs", 
            "unlimitedStorage"] as chrome.runtime.ManifestPermissions[],
    }));