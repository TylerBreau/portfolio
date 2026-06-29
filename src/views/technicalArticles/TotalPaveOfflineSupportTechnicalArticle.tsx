
import {ITotalPaveOfflineSupportProps} from '@Interfaces/technicalArticles/ITotalPaveOfflineSupport';

import {TechnicalArticleLogic} from '@Logic/TechnicalArticleLogic';

export function TotalPaveOfflineSupportTechnicalArticle(props: ITotalPaveOfflineSupportProps) {
    return <div className={TechnicalArticleLogic.getClassName(['TotalPaveOfflineSupportArticle'], props.className)}>
        <h1>Executive Summary</h1>
        Over the course of my eight years at TotalPave, I designed, expanded, and maintained TotalPave&apos;s offline support infrastructure across several projects.
        <br />
        Offline Support began as a prototype built in a brand new mobile application during my college OJT. Over eight years, I evolved it into a critical piece of shared infrastructure used by all of TotalPave&apos;s mobile applications, enabling field workers to collect and access road condition data in areas with unreliable internet connectivity while maintaining data consistency between mobile devices and servers.
        <br />
        The evolution of this system followed several major milestones:
        <br />
        During my OJT, I implemented the first version of Offline Support in the Tracker application, a low-risk production application used to validate the architecture before introducing it to larger systems.
        <br /><br />
        As a full-time developer, I expanded Offline Support to the PCI application, adapting the architecture to handle significantly larger datasets, complex hierarchical data structures, dataset merging, data integrity constraints, and inaccurate device timestamps.
        <br /><br />
        Following my work with the PCI application, I introduced Offline Support to the IRI application by reusing the shared architecture while adapting it for a simpler read-only synchronization workflow.
        <br /><br />
        As a Senior Developer, I contributed to major architectural redesigns across TotalPave&apos;s technology stack, including redesigning Offline Support from per-entity to per-attribute synchronization and preparing the system for future scalability.
        <br /><br />
        My final work on Offline Support transformed the system from a solution designed for a single data collection standard into a framework capable of supporting multiple industry standards, including the fresh implementation of Ontario&apos;s MTO data collection requirements.
        <br /><br />
        The following provides a detailed technical breakdown of the challenges encountered, the architectural decisions made, and the solutions implemented.
        <h1>The Problem</h1>
        TotalPave has a suite of software designed for the road maintenance industry.
        <br />
        Clients provide TotalPave with their road network, a collection of roads they are responsible for maintaining, and use TotalPave&apos;s mobile applications to perform road condition surveys.
        <br /><br />
        Depending on the location of the client&apos;s roads, internet was not always available or reliable. 
        <br />
        Without a reliable internet connection, survey data could not be saved, potentially resulting in data loss or making digital surveys impossible to complete in certain locations.
        <br />
        Similarly, field workers may be unable to view the road network and existing survey data, which is a valuable capability when determining which roads still require inspection while working in the field.
        <h1>The Tracker Application</h1>
        The Tracker application was my first project at TotalPave, developed during my OJT.
        <br /><br />
        This project involved building a new mobile application from the ground up to support offline usage.
        <br />
        The architecture for the first iteration of offline support was designed by the lead developer, and I was responsible for implementing the system.
        <br /><br />
        The intent behind this project was to experiment with offline support before introducing large-scale refactors to TotalPave&apos;s critical mobile applications. In addition, this project provided an opportunity for me to contribute a production application that delivered value to TotalPave during my OJT.
        <br /><br />
        The Tracker application, like all of TotalPave&apos;s applications, was designed to collect and display field data.
        <br />
        Tracker&apos;s dataset was relatively simple compared to TotalPave&apos;s other applications, consisting of a collection of independent data models rather than a complex hierarchical structure.
        <h1>The First Iteration</h1>
        <h2>Offline Architecture</h2>
        For TotalPave&apos;s needs, offline support was not simply a matter of caching server data locally. The applications needed to support bidirectional synchronization: mobile devices could collect and modify data while offline, while the server could also receive changes from other users. This created two independent sources of truth that needed to be reconciled.
        <br /><br />
        To solve this problem, the lead developer designed an architecture where both the client and server maintained their own copy of the data. Instead of continuously tracking every individual change, each data model stored a last modified date that was updated whenever the data changed.
        <br />
        When a mobile application started synchronization, the server compared lightweight manifests containing metadata about the data held by the client and the server. Based on these manifests, the server determined which records needed to be uploaded, downloaded, or removed from the client device.
        <br /><br />
        Implementing this architecture required solving three primary challenges:
        <ol>
            <li>Detecting divergent state and determining how to resynchronize.</li>
            <li>Handling data conflicts when saving data to the client&apos;s permanent storage.</li>
            <li>Handling data conflicts when uploading data to the server.</li>
        </ol>
        <h2>Detecting & Resynchronizing Divergent State</h2>
        The Offline Support system solved this problem with a sync HTTP handler.
        <br />
        The implementation flow is as follows:
        <ol>
            <li>The client produces its lightweight manifest.</li>
            <li>The server produces its lightweight manifest.</li>
            <li>
                The server compares the two manifests and produces of list of instructions for the client to resynchronize with the server. Here are the possible instructions:
                <br />
                <ul>
                    <li>Server has data the client is missing. Client must download.</li>
                    <li>Server has data with a more recent last modified date. Client must download.</li>
                    <li>Client has data the server is missing. Client must upload.</li>
                    <li>Client has data with a more recent last modified date. Client must upload.</li>
                    <li>Client has data that is marked as deleted on the server. Client must discard this data when safe to do so.</li>
                </ul>
            </li>
        </ol>
        This process faced a major challenge regarding records marked as deleted.
        <br />
        The lifecycle of Tracker&apos;s dataset is quite simple. The user collects data. The user decides when the data is irrevelant and marks the data as deleted.
        <br />
        As the application is used over the following years, there&apos;s going to be an ever increasing quantity of data. Whenever the client attempts to synchronize with the server, the server must account for the possibility that the client still holds records that have been marked as deleted.
        <br /><br />
        If the server excluded all deleted data, then there would be two side effects.
        <br />
        First, the server would be unable to instruct the client to discard data when safe to do so. It needs to know the data is marked as deleted on the server to do this.
        <br />
        Second, just because data is deleted does not mean changes are irrelevant. Data stored on the server can always be recovered. Even if the user creates a new survey and then immediately deletes it, simple rules are followed to ensure correctness: Data must always be fully uploaded before it is safe to remove from the client device. For this reason, if the client held data that the server is missing and is marked as deleted, the server would produce an upload instruction. 
        <br /><br />
        However, the server also can not include all deleted data. Eventually there would be more wasted work than useful work. 
        <br /><br />
        To solve this challenge, the server would use a few conditions when selecting data for its own lightweight manifest:
        <ol>
            <li>All data that is not marked as deleted.</li>
            <li>All deleted data that is present within the client&apos;s manifest.</li>
        </ol>
        This was a very elegant solution. The server only ever needed to care about deleted data if the client was aware of the deleted data.
        <h2>Handling Data Conflicts when Saving to Local Permanent Storage</h2>
        When the client saved data to permanent storage, there were several ways for data conflicts to occur.
        <br />
        For example, the client may begin synchronization and receive a download instruction for a record. Before the downloaded record is saved locally, the user modifies that same record. If the downloaded copy overwrites the local modification, data is lost. The user&apos;s modification is the most recent copy of that data.
        <br /><br />
        Similarly, it&apos;s possible for a client to modify data without an internet connection and then for a colleague to modify the same data and upload their modifications to the server.
        <br />
        Then the client regains internet and is attempting to resynchronize. The client and his colleague both have modifications to the same data but the colleague made his modifications after the client. The colleague&apos;s copy would have a newer last modified date. In this case, the client&apos;s modifications have to be discarded because the data with the most recent last modified date is the most correct. 
        <br /><br />
        Regardless of the source of the incoming data, saving data to the client&apos;s permanent storage must always detect divergent state between the incoming data and the currently saved data.
        <br /><br />
        To solve this challenge, I implemented the same divergent state detection logic used by the sync HTTP handler. The last modified date determined which copy was considered the most correct.
        <h2>Handling Data Conflicts during Upload Requests</h2>
        Another challenge that was faced was data conflicts during upload requests. 
        <br /><br />
        For example, a client and a colleague may both modify the same data. The colleague&apos;s modifications have the more recent last modified date and are uploaded to the server first. The client may have a weak but usable internet connection, causing their upload request to take longer than expected. The data being uploaded by the client is older than the data already stored on the server, even though it was recently modified from the client&apos;s perspective.
        <br /><br />
        If I let the upload HTTP handler overwrite that data, I&apos;m allowing old data to overwrite new data. Therefore, like the sync HTTP handler and saving data to the client&apos;s device, the upload HTTP handler must also detect divergent state.
        <br /><br />
        However, the upload HTTP handler&apos;s responsibility is to upload data. The sync HTTP handler&apos;s responsibility is to determine how to resynchronize. The approach I used here was a separation of concern.
        <br />
        The upload HTTP handler would detect divergent state and reject any data that was older than server data. When this occurred, a special error was returned that instructed the client to resynchronize. Determining how to resynchronize was deferred back to the sync HTTP handler instead of duplicating the behavior between HTTP handlers. 
        <h2>Concluding Offline Support for the Tracker Application</h2>
        In conclusion, the first iteration of offline support became a foundational system spanning multiple HTTP handlers and the client codebase. It established the mechanisms required to reconcile data between two sources of truth, detect divergent state, and safely synchronize changes while handling edge cases.
        <br />
        In addition, my work here validated the offline architecture and provided the groundwork for introducing offline support to TotalPave&apos;s more complex applications.
        <h1>Introducing Offline Support to the PCI Application</h1>
        After my OJT, I was hired full-time at TotalPave. My first project as a full-time employee was to implement offline support in one of TotalPave&apos;s existing applications, the PCI application.
        <br /><br />
        The PCI application was used by field workers to perform visual road condition surveys according to the industry standard ASTM D6433 Rev 23. 
        <br />
        The PCI application had its own set of challenges that ramped up the complexity of offline support. The two main differences were:
        <ol>
            <li>
                The PCI application displayed the client&apos;s road network on an embedded Google Maps.
                <br />
                <ul>
                    <li>As a reminder, a road network is a collection of roads the client is responsible for maintaining. The average client held two thousand to five thousand data models representing their road network.</li>
                    <li>Unlike the Tracker application, which started with an empty dataset, the PCI application started with an existing collection of road network data.</li>
                </ul>
            </li>
            <li>
                The survey data collected by the PCI application was significantly more complex than the Tracker application.
                <br />
                <ul>
                    <li>The data models were organized into a hierarchical structure. The hierarchical structure contained three to five different types of data models. The total number of data models in a particular hierarchical dataset could range from three to over five hundred.</li>
                    <li>There was a great deal of variance in the hierarchical structure depending on the type, size, and condition of the road.</li>
                    <li>There were several data model constraints that had to be respected at all times.</li>
                </ul>
            </li>
        </ol>
        <h1>The Second Iteration</h1>
        The offline architecture of the second iteration did not change. The same overall principles were maintained and applied to the PCI application. What changed were the challenges introduced by the PCI application&apos;s larger dataset and more complex data structures.
        <br />
        In addition to the challenges the Tracker application faced and solved:
        <ol>
            <li>Instead of synchronizing a list of data models, the PCI application synchronized a list of hierarchical datasets.</li>
            <li>The total quantity of data being worked with was significantly greater than in the Tracker application.</li>
            <li>The lifecycle of PCI data was different from the lifecycle of Tracker data.</li>
            <li>Time accuracy issues emerged due to inaccurate device clocks.</li>
        </ol>
        <h2>Detecting & Resynchronizing Divergent State at the Hierarchical Structure Level</h2>
        Like the Tracker application, the PCI application still used last modified dates to compare data and determine how to resynchronize.
        <br /><br />
        However, Tracker&apos;s implementation of Offline Support was designed around individual records. The PCI application has different needs.
        <br />
        As previously indicated, the dataset collected by the PCI app was organized into a hierarchical structure. The hierarchical structure can have three to five different types of data models, with the total quantity of individual data models ranging anywhere from three to over five hundred. The exact number varied greatly depending on the type, size, and condition of the road. 
        <br /><br />
        This introduced a new challenge: What happens when one part of a hierarchical dataset is modified by the client and one part is modified by a colleague?
        <br /><br />
        For example, if the client modified the parent model and a colleague modified the child model, these changes did not directly conflict because they affected different parts of the hierarchical dataset. However, the synchronization process still needed a way to represent both changes and ensure they were merged correctly.
        <br /><br />
        As an intermediate developer, I made the design decision to have the Offline Support system operate on hierarchical datasets instead of individual models. This was the first reason behind this decision.
        <br />
        When the sync HTTP request produced a list of instructions for the client to resynchronize, download and upload instructions were assigned to the hierarchical dataset rather than the specific model that caused them. Additionally, the download and upload HTTP handlers were designed to always work with a list of hierarchical datasets.
        <br /><br />
        With this design decision, a hierarchical dataset can have both an upload and a download instruction because different parts of the hierarchical dataset may have diverged independently. In the end, the client and server copies of the hierarchical dataset would be merged with both changes preserved.
        <br /><br />
        While operating on hierarchical datasets instead of individual models introduced some inefficiencies, this was a calculated trade-off. 
        <br />
        With this choice, I avoided the additional challenge of splitting hierarchical datasets up, downloading & uploading specific parts, having the server HTTP handlers respond to the several different possibilities, and most importantly: Maintaining data model constraints that involved multiple data models.
        <h2>Merging Hierarchical Datasets & Handling Data Model Constraints</h2>
        As noted in the previous topic, changes from different copies of a hierarchical dataset can be merged together. There are cases where a hierarchical dataset must both be downloaded and uploaded for the client to resynchronize. This type of case always results in merging hierarchical datasets and introduced a new challenge.
        <br /><br />
        For example, concrete roads are built with concrete slabs. The individual slabs that make up the road are included in the survey data. Each individual slab holds its own condition data. The slabs are organized and displayed in a 2d grid.
        <br />
        If the client and a colleague are modifying the same existing survey, and they both add a slab to this grid. They place the slab at the same coordinate. These slabs are individual data models with different identifiers. They are not the same slab. However, they are placed at the same coordinate, which indicates they represent the same data.
        <br />
        This is a case where the server is missing client data, and the client is missing server data. This normally means this particular hierarchical dataset must both be downloaded and uploaded, and the two different hierarchical datasets would be merged together.
        <br />
        In this particular example, that would create bad data. To resolve this challenge, I would apply the same last modified date logic. The slab with the most recent last modified date would be accepted as the most correct. The other slab would be marked as deleted.
        <br /><br />
        However, this challenge does not end there. This is a road condition survey, slabs have conditions that are internally known as Distresses. For example, potholes, cracking, weathering, etc. A Distress is an individual model. A slab may have multiple distresses.
        <br />
        If the client collected distress data of a pothole on this slab and the colleague did not. Regardless of which slab has the most recent last modified date, I must assume this is valid data. 
        <br /><br />
        As a part of merging hierarchical datasets, the list of distresses these slabs contain will be merged together. This act of merging can violate other data model constraints. If instead, both the client and the colleague collected data for the potholes on this slab, then there&apos;s duplicated distress data. Like the slabs, these distress models have different identifiers. They are not the same model. However there are rules that allow me to detect duplicated distress data. By following these rules, I am able to detect a violated constraint.
        <br />
        Whichever distress has the most recent last modified date is kept. The other distress is marked as deleted.
        <br /><br />
        This is a recurring pattern. Whenever there is any form of conflict in the act of merging hierarchical datasets, I compare last modified dates and preserve the data with the most recent last modified date. If the conflict involves multiple data models, the older data models will be marked as deleted.
        <br /><br />
        This kind of behaviour is observed in several areas of the code, with appropriate abstractions where sensible. As previously noted, there are three areas of code that detect divergent state between hierarchical datasets. The sync HTTP handler, the upload HTTP handler, and the act of saving data to the client&apos;s permanent storage. In all three locations, I had to ensure data model constraints were always observed. 
        <h2>Scalability Problems</h2>
        Up until this point, the Offline Support System utilized a filesystem storage strategy on the client device. This approach was sufficient for the Tracker application because its dataset was relatively small and simple.
        <br /><br />
        For the PCI application, several problems appeared. The PCI Application worked with a far larger quantity of data in general. Even when the application did not hold any surveys, it could be working with anywhere from one thousand to six thousand data models - This is purely the client&apos;s road network. As surveys are collected, this number can grow significantly, a single survey could hold one hundred, two hundred, or more individual data model objects. 
        <br /><br />
        Storing hierarchical datasets in the filesystem was simply far too slow. No matter how it was approached, having a singular file imitating as a database, or having a file for each hierarchical dataset. To solve this problem, I transitioned towards a SQLite database and implemented a client-side database schema as well a suite of sqlite queries. 
        <h2>Data Lifecycle in the PCI Application</h2>
        Unlike the Tracker application, PCI surveys were not typically marked as deleted. The data was considered very valuable as a historical record of the client&apos;s road network. Instead of deleting data and propagating deletion to the application, the lifecycle of PCI data was oriented around collection years.
        <br /><br />
        Simply put, road maintenance works on a seasonal schedule. Data is collected at certain times in the year and is used to financially plan repairs later. 
        <br />
        All data collected by TotalPave&apos;s applications held a creation date. For PCI, the creation date of the survey model was used to decide when a survey model&apos;s lifecycle had ended. The survey data would always be available on the customer web portal but every new year, a new collection period would start. All data from previous collection years was no longer relevant to the PCI application, so the sync HTTP handler would instruct the app to remove old survey data from its permanent storage.
        <h2>Emergence of Time Inaccurate Issues</h2>
        After the initial release of offline support for mobile applications, an unforeseen issue emerged. That is users changing the time on their phone to be in the future, for example five minutes into the future. 
        This posed very serious problems because these devices would also produce last modified dates in the future.
        <br /><br />
        Any data that had a last modified date in the future was effectively untouchable unless one of two conditions were satisfied:
        <ol>
            <li>You use a device that is also set to a time in the future.</li>
            <li>You wait for real life time to catch up that last modified date in the future.</li>
        </ol>
        The reason is that even if you made changes to the data, the last modified date produced at the current time would still be older than the existing future date. This Offline Support System followed a simple rule. The most recent last modified date is the most correct, in this case future dates would always be the most correct.
        <br /><br />
        To solve this problem, I first had to design and implement a Cordova plugin, @totalpave/cordova-plugin-date. I used a Cordova plugin because TotalPave&apos;s mobile applications used the Cordova framework. 
        <br />
        @totalpave/cordova-plugin-date interfaced with Instacart&apos;s TrueTime library. The Truetime library handles various Network Time Protocol (NTP) concerns. These libraries were built for Android and iOS. Because I was working with Cordova, I had to build a plugin to integrate the libraries with TotalPave&apos;s software.
        <br />
        The way this plugin worked was quite simple, instead of using JavaScript&apos;s Date object directly you would call on the plugin&apos;s now and getDate APIs. The date objects the plugin produced would use NTP information to produce accurate date objects.
        <br /><br />
        However, this solution alone was not enough. NTP requires an internet connection. The device must communicate with a server to determine the real-world time. While we made various efforts to maintain NTP information beyond the lifespan of the mobile applications, it was always possible for a client&apos;s device to produce inaccurate dates.
        <br /><br />
        Because NTP synchronization could not be guaranteed, I updated the upload HTTP handler to verify all last modified dates. Whenever a hierarchical dataset was uploaded with a last modified date in the future, the hierarchical dataset would be rejected with a special error. 
        <br /><br />
        The special error informed the client it possessed data with an inaccurate time. The client would then process the affected hierarchical datasets and reset any future timestamps to the current time.
        <br /><br />
        Naturally, until the client successfully communicates with the NTP server, generated timestamps will still be inaccurate. However, once the client successfully communicated with the NTP server, we cached the NTP information. The client could then generate accurate timestamps and eventually correct all affected data, allowing the upload process to succeed.
        <h2>Concluding Offline Support for the PCI Application</h2>
        The second iteration of Offline Support expanded from a small application with simple data models into a system capable of handling large datasets, complex hierarchical structures, lifecycle-based data clearing, and NTP-based time synchronization.
        <br /><br />
        After PCI Offline Support was released and the NTP-related issues were resolved, the system began stabilizing. Over the following years, I was responsible for maintaining the system and fixing any bugs that arose.
        <h1>Introducing Offline Support to the IRI Application</h1>
        The IRI application is TotalPave&apos;s third and final mobile application. Rather than an increase in complexity, I had to use existing abstracted code and optimize for a steep decrease in complexity. 
        <br /><br />
        The IRI application is used to conduct instrumented road condition surveys. Unlike the other applications, the IRI app did not modify the data managed by the offline synchronization system. The data it collected was stored in a different format and required heavy processing on TotalPave&apos;s server.
        <br /><br />
        The challenge was that the offline support codebase had already been abstracted to support multiple applications. Each application used the same shared codebase with its own extensions and overrides. The shared codebase comes with the assumption of handling multiple sources of truth, that&apos;s what it is optimized for.
        <br /><br />
        In the case of the IRI application, which only required downloading data, I implemented overrides that bypassed unnecessary processing related to uploading and conflict resolution.
        <h1>MTO Support Project</h1>
        Years later, I had progressed from a college graduate to a Senior Developer. TotalPave was looking to support an additional industry standard for data collection in the PCI application, specifically to expand into Ontario&apos;s market.
        <br />
        Ontario follows a collection of standards and provisions recommended or required by the Ministry of Transportation of Ontario (MTO). The PCI application up to this point was designed solely for the standard ASTM D6433 Rev 23. The full details of this project will be covered in the MTO Support article. This article will focus specifically on the changes made to the Offline Support and Resynchronization systems.
        <br /><br />
        This project faced a number of significant challenges that involved major refactors across TotalPave&apos;s entire tech stack. For the refactors related to Offline Support, the challenges included:
        <ul>
            <li>A redesign of how last modified dates are used.</li>
            <li>Significant refactors across the Offline Support System.</li>
        </ul>
        <h2>Redesigning how Last Modified Dates are Used</h2>
        Now that TotalPave was planning support for additional standards, we had to consider the assumptions, needs, and variables each standard would come with.
        <br /><br />
        One concern I raised was the problem of different standards applying different validation rules to shared data attributes.
        <br />
        The root object of the hierarchical structure is not the survey model; it is the road model, a data model representing a physical road. A road model will often snapshot data relevant to surveys, so we have to account for the different rules between the different standards.
        <br /><br />
        Another question was what are we going to do about column bloat in the database. Especially if ten years down the line TotalPave supports five different standards. Each standard may require a few additional columns, and eventually half of the road table could consist of standard-specific columns.
        <br /><br />
        Additionally, how are we going to organize survey data? We have a table that holds survey data, it is designed around ASTM D6433 Rev 23 assumptions. Where are we going to store surveys of other standards?
        <br /><br />
        The solution the lead developer and I settled on was attributes tables. We moved attributes that are allowed to be modified to an attributes table. There were multiple attribute tables, each with foreign keys to a specific table, such as road and survey.
        <br />
        The attributes table was effectively a solution where each row represented a single model attribute. For example, road width would exist as its own row in the attributes table.
        <br /><br />
        This solved several problems: column bloat, database schema & seeding migrations required to add new columns, and data organization & scaling as additional standards were supported.
        <br /><br />
        In addition, the lead developer identified another major challenge. With so many rows representing parts of a data model, how do you maintain the last modified attribute?
        <br /><br />
        In summary, this project redesigned the server-side database to support future projects, established the groundwork for the Offline Support System to compare individual attributes instead of entire data model entities, and maintained backwards compatibility with existing systems.
        <h3>Last Modified Per Attribute & Offline Support</h3>
        This change did not introduce any user-facing functionality. Its purpose was to fundamentally change how the system managed data internally.
        <br /><br />
        The data models were redesigned around per-attribute tracking. Instead of each data model having a single last modified date, each modifiable attribute maintained its own last modified date. As part of this update, all systems that relied on last modified dates were updated to operate on a per-attribute basis: divergent state detection, hierarchical dataset merging, and correcting bad timestamps through the NTP solution.
        <br /><br />
        The lightweight manifests increased significantly in size as they needed to mimic the structure of the new models. However, there were still opportunities to reduce unnecessary data. Most attributes only needed to provide their last modified timestamp when generating the lightweight manifest; the actual attribute value was often unnecessary for synchronization comparisons.
        <h3>Backwards Compatibility</h3>
        Due to how mobile application updates work, immediately updating existing clients and their HTTP handlers was effectively impossible. TotalPave did not have infrastructure to force application updates, nor was that approach considered desirable.
        <br />
        To avoid disrupting service, we had to maintain old versions of HTTP handlers for a period of time. 
        <br /><br />
        To maintain compatibility, we updated older versions of the HTTP handlers to translate between the assumptions of previous mobile applications and the new server architecture.
        <br />
        In practice, this was a relatively straightforward compatibility layer because only a few concessions were required.
        <br /><br />
        Whenever an older client downloaded data, the last modified timestamps of each attribute were collapsed into a single timestamp. Whichever attribute had the newest timestamp determined the last modified date provided to the client. Similarly, when an older client uploaded data, the singular last modified timestamp it provided was applied to every modifiable attribute.
        <h2>Refactoring the Offline Support System</h2>
        With last modified per attribute implemented, I could now focus on supporting additional standards. 
        <br /><br />
        Whenever the Offline System performed divergent state checks, merged hierarchical datasets, or processed an entire data tree before saving to permanent storage, the datasets and algorithms involved were standard-specific. Each standard had to be handled in its own way.
        <br />
        This was a well-known software design problem, and a textbook example of applying the Factory and Strategy design patterns.
        <br /><br />
        Factories chose which strategy to use, strategies abstracted the implementation details of each standard.
        The shared data point that powered the factory was simply a standard attribute on the survey model. A data point that indicated which standard the survey followed.
        <br /><br />
        This was combined with a context object, that would optionally define standard specific sub-context objects. The context object carried processed information throughout the processing pipelines.
        <br />
        When a strategy was utilized, it would run the context object through an initializer, ensuring the standard-specific concerns required by that strategy were present before processing began.
        <h1>To Conclude...</h1>
        I first started working on offline support as an intern during my college OJT, and I continued evolving the system throughout my eight years at TotalPave as I grew into a Senior Developer.
        <br />
        This large system had started on a filesystem-based implementation. It was used by a single low-risk mobile application, handling entity to entity conflict resolutions. 
        <br /><br />
        As of my final days at TotalPave, it had become a critical piece of infrastructure that all three of TotalPave&apos;s mobile applications depended on. It was now using a SQLite-based storage strategy, handling entity-attribute to entity-attribute conflict resolution, performing synchronization across data networks containing thousands of road segments, integrating with NTP servers to protect its conflict resolution strategy, and supporting multiple standards of data collection.
        <br />
        Offline Support is the project I take the most pride in, and it remains the crown jewel of my time at TotalPave.
    </div>;
}
