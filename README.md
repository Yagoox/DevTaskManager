<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>

<h1>DevTaskManager</h1>

<h2>Description</h2>
<p>
    <strong>DevTaskManager</strong> is a Chrome extension developed to facilitate project and task management directly within the browser. This project was initiated as part of a university assignment. During a brainstorming session, the idea emerged to create a tool that integrates project management functionalities with the convenience of a browser extension, and I decided to bring this idea to life.
</p>
<p>
    With an intuitive interface and a robust API, DevTaskManager allows users to create, update, delete, and view projects and their respective tasks efficiently, promoting better organization and productivity for development teams.
</p>

<h2>Features</h2>
<ul>
    <li>
        <strong>Project Management:</strong>
        <p>Allows the creation, updating, and deletion of projects. Each project can contain multiple tasks, facilitating the organization of activities.</p>
        <pre><code>// Example of creating a project in the backend
await projectService.CreateProjectAsync("New Project");
        </code></pre>
        <p>Related file: <code>backend/Services/ProjectService.cs</code></p>
    </li>
    <li>
        <strong>Task Management:</strong>
        <p>Addition, editing, and removal of tasks associated with projects. Tasks can have different statuses such as "To Do," "In Progress," and "Completed."</p>
        <pre><code>// Example of creating a task in the backend
await taskService.CreateTaskAsync(projectId, "Implement API", "To Do");
        </code></pre>
        <p>Related file: <code>backend/Services/TaskService.cs</code></p>
    </li>
    <li>
        <strong>Notifications:</strong>
        <p>Notification system to inform users about successful actions or errors, providing immediate feedback.</p>
        <pre><code>// Example of a notification in the frontend
showNotification("Project created successfully!", "success");
        </code></pre>
        <p>Related file: <code>frontend/src/pages/home/App.tsx</code></p>
    </li>
    <li>
        <strong>Responsive Interface:</strong>
        <p>Adaptive design for mobile devices and desktops, ensuring a consistent user experience across different platforms.</p>
        <p>Responsible components: <code>Header.tsx</code>, <code>Sidebar.tsx</code>, <code>MobileMenu.tsx</code></p>
    </li>
    <li>
        <strong>Documented API:</strong>
        <p>Comprehensive API documentation using Swagger, facilitating integration and understanding of the provided functionalities.</p>
        <p>Configuration file: <code>backend/Program.cs</code></p>
    </li>
    <li>
        <strong>Chrome Extension:</strong>
        <p>DevTaskManager is implemented as a Chrome extension, enabling task management directly within the browser without the need to access a separate web application.</p>
        <pre><code>// Example of the extension's manifest configuration
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
    background: {
        service_worker: "frontend/src/pages/background/index.ts",
    },
    action: {
        default_icon: {
            "16": "frontend/src/assets/icons/icon-16.png",
            "48": "frontend/src/assets/icons/icon-48.png",
            "128": "frontend/src/assets/icons/icon-128.png"
        },
    },
    permissions: ["tabs", "storage", "scripting", "unlimitedStorage", "sidePanel", "activeTab", "windows"],
    web_accessible_resources: [{
        resources: ["frontend/src/pages/home/index.html*"],
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
        </code></pre>
        <p>Related file: <code>frontend/src/manifest.config.ts</code></p>
    </li>
</ul>

<h2>Requirements</h2>

<h3>Hardware Requirements</h3>
<ul>
    <li><strong>Backend:</strong> Machine with support for .NET 8.0 and capacity to run SQLite.</li>
    <li><strong>Frontend:</strong> Computer with support for Node.js (version 14 or higher).</li>
</ul>

<h3>Software Requirements</h3>
<ul>
    <li><strong>Backend:</strong>
        <ul>
            <li><a href="https://dotnet.microsoft.com/download">.NET 8.0 SDK</a></li>
            <li><a href="https://www.sqlite.org/index.html">SQLite</a></li>
        </ul>
    </li>
    <li><strong>Frontend:</strong>
        <ul>
            <li><a href="https://nodejs.org/">Node.js</a> (version 14 or higher)</li>
            <li><a href="https://www.npmjs.com/">npm</a> or <a href="https://yarnpkg.com/">Yarn</a></li>
        </ul>
    </li>
</ul>

<h2>Installation and Setup</h2>

<h3>General Steps</h3>
<ol>
    <li>
        <strong>Clone the Repository:</strong>
        <pre><code>git clone https://github.com/Yagoox/DevTaskManager.git
cd DevTaskManager
        </code></pre>
    </li>
    <li>
        <strong>Set Up the Backend:</strong>
        <pre><code>cd backend
dotnet restore
dotnet ef database update
dotnet run
        </code></pre>
        <p>
            The backend will be available at <a href="http://127.0.0.1:5146">http://127.0.0.1:5146</a>.
        </p>
    </li>
    <li>
        <strong>Set Up the Frontend:</strong>
        <p>In a new terminal tab:</p>
        <pre><code>cd frontend
npm install
npm run dev
        </code></pre>
        <p>
            The frontend will be available at <a href="http://localhost:5173">http://localhost:5173</a>.
        </p>
    </li>
</ol>

<h3>Database Configuration</h3>
<p>
    <strong>DevTaskManager</strong> uses SQLite as its database. Migrations are already set up to create the necessary tables. To reset the database:
</p>
<pre><code>dotnet ef database drop
dotnet ef database update
</code></pre>

<h2>Usage</h2>
<ol>
    <li>
        <strong>Access the Application:</strong>
        <p>Open your browser and navigate to <a href="http://localhost:5173">http://localhost:5173</a>.</p>
    </li>
    <li>
        <strong>Manage Projects:</strong>
        <ul>
            <li><strong>Add Project:</strong> Click the add (+) button in the sidebar to create a new project.</li>
            <li><strong>Edit Project:</strong> Click the edit icon next to an existing project.</li>
            <li><strong>Delete Project:</strong> Click the delete icon next to an existing project.</li>
        </ul>
    </li>
    <li>
        <strong>Manage Tasks:</strong>
        <ul>
            <li><strong>Add Task:</strong> Select a project and click the add (+) button in the tasks section.</li>
            <li><strong>Edit Task:</strong> Click the edit icon next to an existing task.</li>
            <li><strong>Delete Task:</strong> Click the delete icon next to an existing task.</li>
            <li><strong>Update Status:</strong> Edit the task to change its status.</li>
        </ul>
    </li>
    <li>
        <strong>Notifications:</strong>
        <p>Receive immediate feedback on your actions through the notification system.</p>
    </li>
    <li>
        <strong>Chrome Extension:</strong>
        <p>After installing the extension in Chrome, you can access DevTaskManager directly in the browser, allowing you to manage your tasks without leaving your favorite pages.</p>
    </li>
</ol>

<h2>API Endpoints</h2>
<p>The <strong>DevTaskManager</strong> API provides the following endpoints:</p>

<h3>Projects</h3>
<ul>
    <li><strong>GET</strong> <code>/api/projects</code> - Retrieves all projects.</li>
    <li><strong>GET</strong> <code>/api/projects/{id}</code> - Retrieves a specific project by ID.</li>
    <li><strong>POST</strong> <code>/api/projects</code> - Creates a new project.</li>
    <li><strong>PUT</strong> <code>/api/projects/{id}</code> - Updates an existing project.</li>
    <li><strong>DELETE</strong> <code>/api/projects/{id}</code> - Deletes an existing project.</li>
</ul>

<h3>Tasks</h3>
<ul>
    <li><strong>GET</strong> <code>/api/projects/{projectId}/tasks</code> - Retrieves all tasks for a specific project.</li>
    <li><strong>GET</strong> <code>/api/projects/{projectId}/tasks/{taskId}</code> - Retrieves a specific task from a project.</li>
    <li><strong>POST</strong> <code>/api/projects/{projectId}/tasks</code> - Creates a new task within a specific project.</li>
    <li><strong>PUT</strong> <code>/api/projects/{projectId}/tasks/{taskId}</code> - Updates an existing task within a project.</li>
    <li><strong>DELETE</strong> <code>/api/projects/{projectId}/tasks/{taskId}</code> - Deletes an existing task from a project.</li>
</ul>

<h3>API Documentation</h3>
<p>
    The API documentation is available through Swagger. After starting the backend, visit <a href="http://127.0.0.1:5146/swagger">http://127.0.0.1:5146/swagger</a> to view and interact with the API.
</p>

<h2>Advanced Features</h2>
<ul>
    <li><strong>Data Validation:</strong> Ensures data integrity and consistency through robust validations in the backend.</li>
    <li><strong>Error Handling:</strong> Error handling system to provide clear and helpful feedback to users.</li>
    <li><strong>Scalability:</strong> Modular structure that facilitates the addition of new features and system scalability.</li>
    <li><strong>Testing:</strong> Implementation of unit and integration tests to ensure code quality.</li>
    <li><strong>Task Automation:</strong> Automated scripts to ease the development and maintenance of the project.</li>
</ul>

<h2>Contribution</h2>
<p>Contributions are welcome! Feel free to open issues or submit pull requests to improve DevTaskManager.</p>

<ol>
    <li><strong>Fork the Repository:</strong> Click the fork button on GitHub to create a copy of the repository in your account.</li>
    <li><strong>Create a Branch for Your Feature:</strong>
        <pre><code>git checkout -b my-new-feature</code></pre>
    </li>
    <li><strong>Commit Your Changes:</strong>
        <pre><code>git commit -m 'Add new feature'</code></pre>
    </li>
    <li><strong>Push to the Branch:</strong>
        <pre><code>git push origin my-new-feature</code></pre>
    </li>
    <li><strong>Open a Pull Request:</strong> Provide a detailed description of your changes and open a pull request for review.</li>
</ol>

<h2>Testing</h2>
<p>To ensure the quality and functionality of <strong>DevTaskManager</strong>, follow the steps below to run tests:</p>
<ol>
    <li><strong>Set Up the Test Environment:</strong>
        <ul>
            <li><strong>Backend:</strong>
                <ul>
                    <li>Ensure the test database is properly configured.</li>
                    <li>Run the necessary migrations.</li>
                </ul>
            </li>
            <li><strong>Frontend:</strong>
                <ul>
                    <li>Install the testing dependencies.</li>
                </ul>
            </li>
        </ul>
    </li>
    <li><strong>Run Backend Tests:</strong>
        <p>Navigate to the <code>backend</code> folder and execute:</p>
        <pre><code>dotnet test</code></pre>
    </li>
    <li><strong>Run Frontend Tests:</strong>
        <p>Navigate to the <code>frontend</code> folder and execute:</p>
        <pre><code>npm run test</code></pre>
    </li>
    <li><strong>Review Test Results:</strong>
        <p>Analyze the logs and results to ensure all tests pass as expected.</p>
    </li>
</ol>

<h2>License</h2>
<p>
    This project is licensed under the MIT License. See the <a href="LICENSE">LICENSE</a> file for details.
</p>

<h2>Contact</h2>
<p>If you have any questions or suggestions, feel free to reach out:</p>
<ul>
    <li><strong>Email:</strong> yagoaborba@hotmail.com</li>
    <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/yagoborba/">Yago A. Borba</a></li>
</ul>

<h2>References and Additional Resources</h2>
<ul>
    <li><a href="https://docs.microsoft.com/en-us/dotnet/">.NET Documentation</a></li>
    <li><a href="https://reactjs.org/docs/getting-started.html">React Documentation</a></li>
    <li><a href="https://tailwindcss.com/">Tailwind CSS</a></li>
    <li><a href="https://docs.microsoft.com/en-us/ef/core/">Entity Framework Core</a></li>
    <li><a href="https://swagger.io/">Swagger</a></li>
    <li><a href="https://vitejs.dev/">Vite</a></li>
    <li><a href="https://heroicons.com/">Heroicons</a></li>
</ul>

</body>
</html>
