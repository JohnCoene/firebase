# Configuration

At this point you will need the R package, install it from Github if you haven't already done so.

```r
remotes::install_github("JohnCoene/firebase")
```

Navigate to your credentials page:

1. Click the gear icon <i class="fa fa-cog"></i> in the top left.
2. Click "project settings"
3. Scroll to the bottom of the "General" tab to find your app credentials.

In there you should find two key things `apiKey` and `projectId`. We will need these to configure {firebase}

!!!note "Project ID"
	If you manually changed the `project_id` use that in
	the function call below, not the one originally created by Google.
	In brief, use the id that is found in the URL of your project.

You can either create a configuration file with the
`firebase_config` function or by setting environment variables.

=== "Environment Variables"
	- `FIREBASE_API_KEY`
	- `FIREBASE_PROJECT_ID`
	- `FIREBASE_AUTH_DOMAIN`
	- `FIREBASE_STORAGE_BUCKET`
	- `FIREBASE_APP_ID`
=== "Config file"
	```r
	firebase::firebase_config(
		api_key = "xXxxXxx", 
		project_id = "my-project-package"
	)
	```

This is necessary for every project that uses {firebase}; the package will, first, look for it in the working directory by
default, second it will look for the environment variables. 
