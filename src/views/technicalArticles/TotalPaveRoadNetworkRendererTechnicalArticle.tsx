
import {ITotalPaveRoadNetworkRendererProps} from '@Interfaces/technicalArticles/ITotalPaveRoadNetworkRenderer';

import {TechnicalArticleLogic} from '@Logic/TechnicalArticleLogic';

export function TotalPaveRoadNetworkRendererTechnicalArticle(props: ITotalPaveRoadNetworkRendererProps) {
    return <div className={TechnicalArticleLogic.getClassName(['TotalPaveRoadNetworkRendererTechnicalArticle'], props.className)}>
        <h1>Executive Summary</h1>
        Road Network Renderer was created to solve scalability issues in TotalPave&apos;s mobile applications. TotalPave&apos;s software was for clients who maintained road networks. The applications displayed the client&apos;s road network and other related data inside Google Maps. TotalPave&apos;s average client managed between two thousand and five thousand roads, while a prospective client managed nearly seventy thousand. Existing approaches to displaying this data on the maps were already approaching their practical limits and could not support a network of this size.
        <br /><br />
        The challenge was further complicated by an automated data collection system present in one of TotalPave&apos;s applications, the IRI application. Performance issues caused by display large road networks could interfere with data collection and potentially produce inaccurate survey results, making performance a critical requirement rather than a quality-of-life improvement.
        <br /><br />
        Through experimentation, the Lead Developer and I determined that performance issues were not due to the quantity of geospatial data but rather how it was used.
        <br />
        One of the IRI application&apos;s major quality of life features was displaying the roads in an embedded Google Maps in the application. This was valuable as clients were able to pause the automated data collection survey, view the map, and identify which roads still needed to be surveyed. 
        <br />
        This feature created an interactable object for every single road displayed on the map, creating the severe performance problems.
        <br /><br />
        To address this, we took inspiration from how Google Maps displays its own map. Google Maps uses a tile-based rendering system. As users zoom and pan, Google Maps communicates with its servers to access and display pre-generated images. This can sometimes be visually seen in Google Maps itself, when tiles take a short moment to load you can sometimes see a rectangular shape that changes after a few seconds. The technical term for this system is called a Tile Layer.
        <br /><br />
        Our solution followed the same concept with notable differences. The Android/iOS Google Maps SDKs allow you to display your own tile layer on top of Google Maps. This can be used to replace the map images altogether, or to display additional information on top of the map images. Generally you host your own tile server that would contain pregenerated images and provide specific images when requested. There were multiple reasons why utilizing a Tile Server was not viable for TotalPave:
        <ul>
            <li>TotalPave&apos;s mobile applications all support and depend on offline usage. Tile Servers require internet.</li>
            <li>The data we were rendering frequently changed. It included both the client&apos;s road network and color coding based on existing survey results. If we wanted to have static images, we would have to find a solution to generate these images for all of our clients, update them whenever existing survey data changed, and hold that data on one of our servers.</li>
        </ul>
        Instead, we took a very different approach: we generated the images on the client&apos;s device. To accomplish this, we built a C++ library that performed the following tasks:
        <ol>
            <li>Loading the client&apos;s data and organizing it in a data structure that mimicked tile servers.</li>
            <li>When the Tile Layer requested an image at a particular coordinate, we would pass that request to the C++ library.</li>
            <li>The C++ library would use the coordinate to efficiently obtain relevant data from the data structure.</li>
            <li>The C++ library would then draw and color the roads on top of a transparent background, generating a tile image. This tile image would be given to the Tile Layer.</li>
        </ol>
        This system effectively produced a dynamic road highlight layer that was displayed on top of Google Maps. 
        <br /><br />
        The completed solution increased supported road network sizes from approximately twenty thousand roads to over one hundred thousand while maintaining acceptable performance on mobile devices.
        <br /><br />
        While the Lead Developer led this project, I made major contributions in identifying viable solutions, providing architectural input during design discussions, and implementing significant portions of the final system. This was a collaborative effort, with both of us contributing to the C++ library, native Android/iOS integration, and overall system implementation.
        <br />
        The following provides a detailed technical breakdown of the challenges encountered, the architectural decisions made, and the solutions implemented.
        <h1>The IRI Application & Road Networks</h1>
        TotalPave produces software for the road maintenance industry. Clients provide TotalPave with the road network, the dataset of roads they are responsible for maintaining, and their workers use TotalPave&apos;s applications to perform road condition surveys.
        <br />
        For field workers&apos; convenience, the worker&apos;s location, road network, and existing survey data via color coding the road network are displayed on an embedded Google Maps. This allows field workers to quickly identify roads that still require data collection.
        <br /><br />
        Road lengths vary greatly and are often split up into road segments. A tiny road between two intersections might only have one segment, while a highway would often have several segments. Each road segment is rendered as an individual object on the map. For all intents and purposes, when this article says roads, it is referring to road segments.
        <br /><br />
        The IRI application is used to perform instrumented road condition surveys. Users rigidly mount their phone inside their vehicle and drive over roads to perform the surveys.
        <br />
        The application utilizes the phone&apos;s accelerometer to record vibrations and bumps while driving and this information is heavily processed to produce an International Roughness Index (IRI) value. This is a quantified value that describes how rough it feels to drive over a road and is backed by an industry standard, ASTM E1926.
        <br />
        The IRI application additionally records location data as the user drives so that IRI values can automatically be tied to specific roads in their road network.
        <h1>The Problem</h1>
        TotalPave was approached by a client who was considering utilizing the IRI application to perform instrumented surveys. This client had a significantly larger road network than any previous TotalPave customer.
        <br /><br />
        TotalPave&apos;s average client managed two thousand to five thousand roads. This new client managed just under seventy thousand roads.
        <br />
        TotalPave&apos;s existing map rendering system was never designed to support this quantity of roads. The lead developer and I were tasked with investigating a means of supporting a road network of this size.
        <br /><br />
        Our existing road rendering solution was already known to have a practical limit of approximately twenty thousand roads, and only under favorable conditions. Dense urban road networks with many closely packed roads represented the worst-case scenario. Supporting this new client&apos;s network would require rendering approximately three times more roads than our worst-case scenario.
        <br /><br />
        Furthermore, there was another critical concern. The IRI application is a Cordova application. The Cordova framework creates a native Android/iOS abstraction around a web browser, allowing developers to build native applications with web technologies and share their application code between iOS and Android.
        <br /><br />
        Due to the limitations of threading in web-based technologies and memory inefficiencies in the Cordova bridge, there were two critical challenges.
        <br />
        The memory inefficiencies, when combined with a dataset of one hundred thousand roads, can cause serious concerns for out of memory crashes.
        <br />
        As JavaScript does not have true multithreading, even with asynchronous features like Promises, the act of rendering road networks can interfere with the automated data collection process and cause inaccurate survey results. This is considered unacceptable.
        <h1>The Experimentation Phase</h1>
        The lead developer and I began experimenting with various ideas: KML documents, GeoJSON multi line strings, GeoJSON feature collections, and any other information we could gather to better understand what factors had the greatest impact on performance when rendering data on Google Maps. We even explored options that bypassed the Cordova bridge and verified whether or not the performance problems would persist if we were communicating directly with the native Android/iOS Google Maps SDKs.
        <br /><br />
        One particularly memorable time for me was when I took the entire seventy thousand road network and combined every single road into one line string. Surprisingly, the line rendered instantly and eliminated all performance problems. The caveat was that the entire road network became a giant blob.
        <br /><br />
        Ultimately, none of these solutions yielded good results, aside from my experiment with a single line string, which proved an important point. Google Maps can handle this quantity of location data but not the quantity of individual objects.
        <br /><br />
        This led to another idea that didn&apos;t quite satisfy our needs: tile servers and tile maps. This is something I originally brought up while recognizing its flaws.
        <br />
        A tile server is a server that accepts a 2D plus zoom level coordinate and returns an image. Images are generally static, making this a very simple fetch image request. This is in fact how Google Maps functions. The visuals of Google Maps are powered by a tile server. 
        <br /><br />
        The basic premise was: what if we hosted a tile server and held images of the client&apos;s road networks?
        <br />
        We&apos;d also have to find a way to handle data changes, as the roads also were color coded to depict the results of existing survey data.
        <br /><br />
        There were two major issues with this idea. First, the IRI application supports offline usage. A tile server solution required internet, at best users would have to open the application at the office and pan the map around at a decent zoom level to cache the images. Second, how could we possibly have the road network images pre-generated for every single client and also maintain the color coding?
        <br /><br />
        These are questions we got stuck on for a while, until the lead developer had an idea. What if we generate the images on the fly? And was the client device capable of generating the images?
        <h1>The Solution</h1>
        We decided to implement a C++ library so that the code can be shared between iOS and Android. There were three main tasks.
        <h2>Obtaining the Data</h2>
        The first task was obtaining data. This was a joint task between the lead developer and me.
        <br /><br />
        In a Cordova application, the typical flow of data would look like the following:
        <ol>
            <li>Starting in the JavaScript environment, cross the Cordova bridge into native Android/iOS and communicate with the SQLite database via a Cordova plugin for working with SQLite databases.</li>
            <li>The SQLite database sends requested data over the Cordova bridge into the JavaScript environment.</li>
            <li>
                You utilize the data in some fashion, for our case that would look like sending the data over the Cordova bridge again to native Android/iOS in the cordova-plugin-googlemaps library.
                <br />
                This may look redundant but each action to cross the Cordova bridge enters an isolated sandbox containing one Cordova plugin. This is a limitation imposed by the Cordova framework. It is not possible to skip traversing to the JavaScript environment because this process involves two different Cordova plugins.
            </li>
            <li>Then send the data over the bridge to the C++ environment.</li>
        </ol>
        As previously stated, there are memory inefficients when crossing the Cordova bridge. This flow would be wildly inefficient, negate any practical gains, and create a high risk of out-of-memory crashes.
        <br/>
        Instead, we decided to have the C++ library load the data manually. We sent the database connection information and query strings across the Cordova bridge for the C++ library to use.
        <br/>
        This was a joint task between the lead developer and me. The lead developer initially set up the C++ SQLite integration while I wrote the queries and tested the C++ SQLite implementation.
        <br /><br />
        In addition, we had to fork the cordova-plugin-googlemaps repository and implemented a custom feature, the TotalPaveTileLayer. This feature accepted the SQLite information from JavaScript environment, passed it through into native Android/iOS, and then into the C++ library. This feature also handled other tasks that will be elaborated on later.
        <h2>Organizing the Data for Usage</h2>
        The second task was organizing the data for efficient usage. The lead developer planned the architecture while I was solely responsible for its implementation. 
        <br /><br />
        As previously stated, Tile Servers and Tile Maps utilize a 2D plus zoom level coordinate. These coordinates correspond to a quad tree structure. At the most zoomed-out level there is a single quadrant. Each additional zoom level divides every quadrant into four smaller quadrants, resulting in four, then sixteen, then sixty-four quadrants, and so on.
        <br /><br />
        The goal was to organize the client&apos;s road network in a way that easily maps to this quad tree structure so that we can quickly identify a small subselection of roads that are relevant to a particular area of the map.
        <br /><br />
        Using geospatial bounding boxes, I performed geospatial contains and intersects comparisons between roads and quad tree quadrants. A road could exist in multiple quadrants. In typical quad tree fashion, when a quadrant contained too many roads, another depth of quadrants would be created and the data would be split between these new quadrants.
        <br /><br />
        The selection of data and organizing the data into a quad tree was a preloaded action. The results were cached and held onto for the lifespan of the application.
        <br /><br />
        For integration, we used the TotalPaveTileLayer feature. This feature interfaced with the Android/iOS Google Maps SDK Tile Layer feature. Effectively, Google Maps would request an image from us at a 2D plus zoom level coordinate. The request was deferred to the C++ library, which used the coordinate to obtain relevant roads for use in the next task.
        <h2>Generating Images from the Data</h2>
        The final task was converting the selection of relevant roads into an image. This portion of the system was primarily implemented by the lead developer. My involvement was focused on testing, assistive debugging, and developing tools to validate the rendering process.
        <br /><br />
        For this task, we have geospatial line string and polygon data. We also have a 2D plus zoom level coordinate, which corresponds to a specific area on a map. 
        <br /><br />
        The library took a transparent image and drew the lines and polygons on this image. This was an in-house custom rendering implementation, 3rd party rendering libraries were not used.
        <br />
        Lines began with a defined pixel width and smoothed with an in-house implementation of an anti-aliasing algorithm. 
        <br />
        The lead developer also accounted for abrupt line endings. Imagine you are dragging a circle diagonally across a piece of paper, starting from a point on the page to a point off the page. We&apos;ll say that line is at a 45-degree angle relative to the edge of the page. 
        <br />
        If you stopped the instant any side of the circle touched the edge of the page, you would have white space gaps eating into your line. These gaps would appear within the 135-degree corner formed by the line and the edge of the page.
        <br />
        To account for this, the lead developer continued the rendering logic outside of the boundaries of the image. Pixels were only placed if they would be placed inside the image but this allowed the line to fully terminate along the edge of the image. 
        <br /><br />
        This system painted lines and polygons on top of a transparent background, and returned these images to the Google Maps SDK to render on top of the map image tiles. This was effectively a road highlight layer.
        <br /><br />
        One very memorable task for me was testing the image generation. This is an area to which I contributed extensively. Inside the native Android/iOS TotalPaveTileLayer codebase, after the C++ library generated an image, I implemented modifications to the image using existing native APIs to render debugging information.
        <br />
        This information included rendering image boundaries and the 2D plus zoom level coordinate. This contribution played significant roles in:
        <ul>
            <li>Understanding and testing the requirements regarding the raw resolution and pixel density of the image.</li>
            <li>Identifying and understanding several bugs in the image generation algorithm.</li>
            <li>In particular, knowing the 2D plus zoom level coordinate of affected tiles was vital for a smooth debugging workflow.</li>
        </ul>
        <h2>In Conclusion...</h2>
        We went from barely supporting twenty thousand roads to smoothly supporting over one hundred thousand roads. 
        <br />
        Average road networks loaded and rendered instantly, while outlier networks like the seventy thousand road network would take a few seconds to initially load but were very performant afterward.
        <h1>Bringing Custom Network Rendering to the PCI application</h1>
        After solving performance problems on the IRI application, TotalPave was looking to integrate the same solution with the PCI application.
        <br /><br />
        The PCI application was used to conduct visual road condition surveys. Users would view an embedded Google Map, pan on the map, and select rendered roads on the map to conduct a survey for. 
        <br />
        For clarity, rendered roads are polylines and polygons that we explicitly drew on the Google Map via the cordova-plugin-googlemap.
        <br /><br />
        Unlike the IRI application, the PCI application required interacting with lines and polygons on the map. A feature that would be difficult when there are no line or polygon objects to interact with, only map tile images.
        <br /><br />
        To solve this challenge, I updated the TotalPaveTileLayer feature. The feature would now accept a geospatial bounding box and pass the bounding box into the C++ library. The library would use the bounding box to query the quad tree and return relevant roads.
        <br />
        I then created interactive map objects representing these few relevant roads, which were rendered on top of TotalPaveTileLayer&apos;s map tiles. The user would then be able confirm which specific road they wished to conduct a survey on. 
        <h1>To Conclude...</h1>
        As of my final days at TotalPave, this project was the most intriguing project I&apos;ve worked on.
        <br />
        TotalPave&apos;s applications went from barely supporting twenty thousand roads to comfortably supporting over one hundred thousand. 
        <br />
        I had to adapt to C++, a language I had not previously used, as well as native Android/iOS development, technologies where I had limited prior experience.
        <br />
        Learning how Google Maps renders tiles, understanding quad trees, and being part of a team that built a custom rendering solution made this a project I will always be proud of.    </div>;
}
