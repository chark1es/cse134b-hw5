# CSE 134B Project

A portfolio website showcasing various projects for CSE 134B.

## Features

-   **Dynamic Project Loading**: Projects can be loaded from either local storage or a remote API
-   **Custom Web Component**: Uses `<project-card>` elements for consistent project display
-   **Theme Toggle**: Light/Dark theme support with persistent user preference
-   **Responsive Design**: Built with mobile-first approach using CSS

## Project Structure

-   `projects.html`: Main projects page with dynamic content
-   `js/projectLoader.js`: Handles project loading from local and remote sources
-   `js/projectCard.js`: Defines the custom project card component
-   `global.css`: Global styles for the application
-   `thumbnails/`: Contains project images

## Changelog Summary

For this project, I made a few changes on top of the homework requirements. For fetching local/remote date, using javascript, I made it so the localstorage gets deleted everytime the button to switch the data gets pressed. This is to show that the data is actually being fetches and prevents any side-effects (duplicate data, doesn't load local data since the remote data contains the same data, etc). Another change I did was CSS styling. Since the project-card component is being dynamically loaded, I had to move the styling from the global css file to the js file. On top of that, I also changed the existing styling to make it to where the UI would look better (buttons, links, color), especially when dark mode is enabled. The certification and footer was also slightly changed, where I added certification links and centered the footer. One last change I made was how forms were handled. Before it just submitted to `httpbin.org`, but I modified it to use `formsubmit.co` for actual form submissions. I also modified the attributed and form format to make it function how I would like it to function.

## Changelog (bottom is most recent)

-   Added a custom project component using javascript
-   Added a custom project loader that dynamically injects the code
    -   Uses local and remote storage.
        -   The local data is based on a hardcoded json file which gets added to localstorage and then displayed
        -   The remote data is stored on jsonbin, which gets fetched & stored inside localstorage. It then gets displayed.
    -   The localstorage gets deleted each time to make sure you can properly switch between local & remote data
    -   Removed the hardcoded project cards since it was being dynamically injected
-   Added two buttons that allows the user to choose which data to load. It is purposely set up with no projects being shown to show the dynamic injection.
-   Added thumbnails for the website. The JSON data contains the route for which image to use.
-   Fixed CSS bug where the global css doesn't get rendered for dynamic components.
    -   The projects card css got removed from `global.css` and got moved to `js/projectCard.js`
    -   The dark mode css was terrible to read so it got modified to make it look better.
    -   The links, when overflowed, looks terrible. A button ui was added to make it look much better.
-   Added a readme to describe the changes based on the HW 5 guidelines
-   Modified the CSS to disabled user selection in the certifications.
-   Modified the font to use my favorite font, Jetbrains Mono, as the default font.
-   Added credly links for each certification.
    -   Made it so the title has the link rather than the entire card.
-   Centered the footer text
-   Changed the readme summary
-   Updated the contact form to use `formsubmit.co` as the way to send emails for forms.
