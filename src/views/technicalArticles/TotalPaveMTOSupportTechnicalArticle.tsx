
import {ITotalPaveMTOSupportProps} from '@Interfaces/technicalArticles/ITotalPaveMTOSupport';

import {TechnicalArticleLogic} from '@Logic/TechnicalArticleLogic';

import DataModelAfter from '@TechnicalArticles/mtoSupport/DataModelAfter.txt';
import DataModelBefore from '@TechnicalArticles/mtoSupport/DataModelBefore.txt';

export function TotalPaveMTOSupportTechnicalArticle(props: ITotalPaveMTOSupportProps) {
    return <div className={TechnicalArticleLogic.getClassName(['TotalPaveMTOSupportTechnicalArticle'], props.className)}>
        <h1>Executive Summary</h1>
        MTO Support transformed TotalPave&apos;s technology stack from a system designed around a single visual road condition survey standard, ASTM D6433 Rev 23, into a framework capable of supporting multiple standards.
        <br /><br />
        To support TotalPave&apos;s expansion into Ontario, Canada, I led the technical analysis required to support an additional visual road condition survey methodology. This involved reviewing Ministry of Transportation of Ontario (MTO) documentation, translating their methodology into software requirements, identifying conflicts with TotalPave&apos;s existing architecture, and presenting findings to the CEO and Lead Developer. From these findings, I collaborated with the Lead Developer on major architectural changes across TotalPave&apos;s technology stack.
        <br /><br />
        Due to ASTM D6433 Rev 23 assumptions being deeply embedded throughout TotalPave&apos;s systems, this project involved several major phases:
        <ol>
            <li>Overhauling the MySQL database into an Entity-Attribute-Value model.</li>
            <li>Refactoring a Customer Web Portal, Mobile Application, and Server-side codebases to support a new standard of visual road condition surveys.</li>
            <li>Implementing MTO Support within the newly developed framework.</li>
        </ol>
        As a collaborative project, the Lead Developer and I both made significant contributions throughout the entire project, including architectural design, implementation, and identifying future scalability concerns.
        <br /><br />
        The following provides a detailed technical breakdown of the challenges encountered, the architectural decisions made, and the solutions implemented.
        <h1>The Problem</h1>
        TotalPave was looking to get into Ontario, Canada&apos;s market of data collection for the road maintenance industry. Ontario uses its own data collection methodology as recommended by the Ministry of Transportation of Ontario (MTO). 
        <br /><br />
        This new methodology is for visual road condition surveys, which is handled by TotalPave&apos;s PCI application. Up until this point, the PCI application has been designed around ASTM D6433 Rev 23, an international standard for visual road condition surveys. ASTM D6433 Rev 23 assumptions were embedded throughout TotalPave&apos;s tech stack, including existing database schema, data flow pipelines, and application architecture.
        <br /><br />
        Before implementation could begin, the MTO methodology had to be translated into software requirements. I led the process of reviewing MTO documentation, identifying differences between the MTO methodology and ASTM D6433 Rev 23, and translating those differences into software requirements. This analysis included initial design considerations for how TotalPave&apos;s existing architecture would need to evolve.
        <br /><br />
        Following this analysis, the Lead Developer and I collaborated on the architectural redesign, including the database overhaul, division of implementation responsibilities, and the design of the Multi-Standard Framework.
        <br /><br />
        As a part this project, three were major phases:
        <ol>
            <li>Attribute Tables Prerequisite Project.</li>
            <li>Multi-Standard Framework Redesign.</li>
            <li>MTO Implementation.</li>
        </ol>
        <h1>Attribute Tables Prerequisite Project</h1>
        Road condition surveys are represented as hierarchical data structures. These hierarchies are reflected throughout TotalPave&apos;s systems, including the database schema.
        <br /><br />
        All standards shared the concepts of Roads and Surveys but the data structures beneath them varied significantly. ASTM D6433 Rev 23 used several hierarchical variations involving Samples, Slabs, and Distresses, while MTO omitted some of these concepts entirely.
        <br /><br />
        While considering how to manage data between the two standards, two major scalability issues were foreseen: column bloat and foreign key mismanagement.
        <br /><br />
        Roads and Surveys contained attributes shared across standards as well as attributes specific to individual standards. What happens ten years later, TotalPave is supporting five different standards, and entity tables are heavily polluted with standard specific columns? These tables could easily end up with as many standard specific columns as there are shared columns.
        <br /><br />
        The second issue involved relationships between entities. Most standards track distress data, recording particular problems with the road. For ASTM D6433, the Distress table already has foreign keys to two individual ASTM D6433 specific tables. MTO would add a third table.
        <br />
        What happens if the third standard requires another foreign key? There is no way to manage this in a clean way. Queries that utilize the Distress table&apos;s foreign keys would have to perform several null checks to determine which foreign key to use.
        <br /><br />
        This lead to a major pre-requisite project, our existing database design was not suitable for supporting multiple different standards. The existing tables were designed around ASTM D6433 Rev 23 assumptions, and there was no abstractions to organize the different concerns of each standard. This project can referred to as the Attribute Tables project. 
        <br /><br />
        To solve these challenges, we transitioned to an EAV system. Each entity table would have an attributes table. Modifieable and standard specific columns were moved to the attributes tables and stored as rows instead of individual columns. We also prefixed standard specific attribute names to ensure we didn&apos;t accidentally re-use standard specific attributes for future standards.
        <br /><br />
        There was one issue this didn&apos;t solve however. You can not make foreign keys an attribute without breaking out of SQL&apos;s relational integrity enforcement and losing out on the value of indexes. Our foreign keys were not considered modifiable anyways but it did maintain one problem that lead to the second decision.
        <br /><br />
        Only the Road and Survey tables would be shared between standards. All other tables were considered standard specific, even if different standards have identical concepts. ASTM D6433 Rev 23 and MTO would have their own copy of the Distress table. These copies possessed their own foreign keys. This did mean additional joins as new standards were implemented however this was not a performance concern and eliminating null foreign keys meant the joins were simpler. 
        <h2>The Data Models & Last Modified Timestamps</h2>
        TotalPave&apos;s application layer contained several data models representing the hierarchical structure of road condition surveys.
        <br />
        These models mirrored the database schema. Each entity model contained direct properties corresponding to database columns and exposed access through getters and setters.
        <br /><br />
        With the database redesign, there was one major architectural design that had to be revisited. In TotalPave, last modified timestamps are not metadata. 
        <br />
        They are critical data points used in a bidirectional synchronization architecture. The full details be covered in the TotalPave Offline Support article, but as a brief summary, TotalPave&apos;s applications utilize Offline first architecture.
        <br /><br />
        Each entity maintained its own last modified timestamp. Because road condition surveys are represented as hierarchical structures, conflicts could not be resolved by simply accepting either the client or server copy. Instead, hierarchical datasets were merged, matching entities by ID and using last modified timestamps to determine which version of each entity should be retained.
        <br /><br />
        Because synchronization relied on these timestamps, updating data without updating the corresponding timestamp effectively made that change invisible to the synchronization system. Last modified timestamps were the mechanism that enabled synchronization between client devices and the server.
        <br /><br />
        With Attribute Tables, maintaining a single entity-level timestamp became increasingly difficult. If Attribute A changed, the entity timestamp also had to be updated correctly or synchronization could miss the change.
        <br /><br />
        The solution was implementing last modified management for every attribute. Every single attribute in the database maintained its own last modified timestamp. This change had to be represented in the data models, thus the data models were also redesigned.
        <br /><br />
        Here&apos;s a visual example of the transition:
        <br />
        <pre><code>{DataModelBefore}</code></pre>
        <pre><code>{DataModelAfter}</code></pre>
        <br />
        The data models changed from representing objects with values to representing objects composed of attributes.
        <h2>Backwards Compatibility</h2>
        Mobile applications introduce backwards compatibility concerns because deployed clients cannot always be updated simultaneously.
        <br /><br />
        For the mobile applications, immediately updating existing clients and their HTTP handlers was effectively impossible. TotalPave did not have infrastructure to force application updates, nor was that approach considered desirable.
        <br />
        To avoid disrupting service, we had to maintain old versions of HTTP handlers and translate the data assumptions of previous mobile applications into the new server architecture.
        <br />
        In practice, this was a relatively straightforward compatibility layer because only a few concessions were required.
        <br /><br />
        Whenever an older client downloaded data, the last modified timestamps of each attribute were collapsed into a single timestamp. Whichever attribute had the newest timestamp determined the last modified date provided to the client. Similarly, when an older client uploaded data, the singular last modified timestamp it provided was applied to every modifiable attribute.
        <br /><br />
        For the rest of TotalPave&apos;s tech stack, we implemented a database-level backwards compatibility layer using views. As a part of the database overhaul, many physical tables were renamed, and the views assumed the old table names. This allowed existing SELECT queries to continue working without refactors. However, data modification queries still depended on the physical schema and had to be updated throughout the tech stack.
        <br /><br />
        Data modifications required separate handling depending on their source: delete queries, PCI application insert/update operations, and all other insert/update operations.
        <br /><br />
        Delete queries were not typical for TotalPave. We typically used deleted flags. The few examples of delete queries that did exist were updated to target the entity tables. In TotalPave&apos;s implementation, attributes were never independently deleted unless the parent entity itself was deleted.
        <br /><br />
        Insert/update queries for the PCI application was standardized in an abstraction layer. This abstraction layer handled all data modification concerns for the PCI application&apos;s HTTP handlers.
        <br /><br />
        The remainder was a mix of customer web portal, Cron Jobs, and the automated testing systems (Unit and E2E). The testing systems had their own database solutions and a large number of tests covered queries and other database interactions. 
        <br />
        We had to go through the tech stack and manually update every one of these queries. Last modified management itself was simple because these codebases relied on MySQL&apos;s automatic ON UPDATE CURRENT_TIMESTAMP behavior.
        <h2>The Problem with MySQL Views</h2>
        We were caught off guard by MySQL views. In many cases, queries executed against views did not utilize existing indexes from the underlying tables as expected. This caused several performance regressions after the database overhaul, as queries that previously relied on indexed access patterns became significantly slower.
        <br /><br />
        To fix this issue, the Lead Developer implemented materialized views using triggers to maintain the materialized data. This fix did work for the most part but there were costs. Some performance problems were simply moved from the act of selecting data to the act of inserting and updating data. While we were able to restore indexed reads, it became clear that materialized views were not a scalable solution for future expansion because maintaining the materialized data introduced additional overhead to insert, upsert, and update operations.
        <br /><br />
        Given the project timeline, we proceeded with the materialized view approach. While it was not an ideal long-term solution due to the additional write overhead, it restored acceptable query performance and allowed the MTO project to proceed.
        <h1>Multi-Standard Framework</h1>
        With the database overhaul complete, the next phase was redesigning TotalPave&apos;s application architecture to support multiple standards. The Attribute Tables project provided the foundation for storing standard-specific data, but application workflows still contained assumptions specific to ASTM D6433 Rev 23.
        <h2>The Offline-first Architecture</h2>
        The Offline-first Architecture is a collection of HTTP handlers and client-side systems that manages the data flow and lifecycle for the mobile applications. Each mobile application has dedicated HTTP handlers. For MTO Support, only the PCI Application&apos;s HTTP handlers were relevant.
        <br /><br />
        As previously mentioned, the full details of the Offline-first Architecture are in the TotalPave Offline Support article. 
        <br /><br />
        Two of three HTTP handlers and the client-side systems performed the following tasks. Each implementation was tailored to the environment&apos;s specific needs.
        <ul>
            <li>Divergent state checks. Checks that determined when the saved state and new state were out of sync. This included comparing server-side and client-side databases, as well as comparing client side in-memory data and SQLite db data. Depending on which environment, these checks either determined how resynchronize two databases, whether resynchronizing was required, or was used to resolve data conflicts.</li>
            <li>Merging hierarchical datasets. This was a conflict resolution step. Rather than accepting one hierarchical dataset over the other, the system traversed the hierarchy and merged only the conflicting portions.</li>
            <li>Data model constraint validations. Merging hierarchical datasets could produce invalid states, requiring additional validation to maintain data integrity. When a constraint was violated, the same conflict resolution strategy used during dataset merging was applied.</li>
            <li>Processing hierarchical datasets for saving to the SQL-based databases.</li>
        </ul>
        These processes were designed around ASTM D6433 Rev 23 assumptions and required refactors for MTO Support. I designed and implemented architectural updates that utilized Factories, Strategies, and Context objects.
        <br />
        Strategies abstracted the standard specific concerns into several public APIs. Multiple public APIs were required as there was multiple steps in these processes that required abstractions.
        <br />
        Factories chose which standards to use and Context objects ferried information from one public API to the next.
        <h2>Web Portal Datalogs</h2>
        The Datalogs screen is a collection of screens and subscreens used to view the hierarchical structure of road condition survey data in a tabular format. Each table provided navigation to the child entities within the hierarchy.
        <br /><br />
        Due to differences between surveys of different standards, it was not feasible to display all surveys in a single table. I implemented a Tab View component that separated the concerns of each standard into their own tab. The Tab View utilized a shared React component and a factory. The factory configured the component through props according to the requested standard.
        <h1>MTO Support</h1>
        With the Multi-Standard framework prepared, the final phase of the project was implementing MTO Support within the new architecture.
        <h2>Database Migration Scripting</h2>
        Even with the framework to support additional standards, there was still a need for database migration scripts.
        <br /><br />
        These scripts added MTO-specific attributes to the Road and Survey entities, seeded required data, and created the schema for MTO-specific distress and distress attribute tables.
        <br /><br />
        In addition, each standard maintained its own configuration variables. The migration script seeded the default MTO configuration for each organization.
        <h2>Update the Web Portal Settings Screen</h2>
        The Web Portal&apos;s Settings Screen contained standard-specific views for updating configuration variables. Each standard had its own dedicated configuration interface.
        <br />
        These configurations included:
        <ul>
            <li>A color scale used to classify roads based on their latest visual road condition surveys.</li>
            <li>Configurable formulas where users could modify coefficients used by MTO survey calculations.</li>
        </ul>
        The Lead Developer was responsible for the formulas, while my contributions focused on implementing configuration UI in the Web Portal.
        <h2>Other Updates</h2>
        Additional MTO integration work included updates to the Web Portal&apos;s Home Screen and the PCI application.
        <br /><br />
        The Home Screen&apos;s primary purpose was to display survey data through an embedded Google Maps component, a table, and a sidebar. For the purposes of supporting multiple standards, there were two primary areas to update.
        <br />
        The first was a map legend component. The legend allowed filtering roads on the map by standard, or lack of a standard. Roads that were filtered out were made partially transparent. 
        <br /><br />
        The second was the sidebar. The sidebar displayed some details about the road condition surveys. Using factories and strategies, I implemented a dedicated MTO view for the sidebar. This included a collapsible UI for displaying the data values that made up the final PCI value, a quick rundown of collected distresses, and a textarea field for survey notes.
        <br /><br />
        I also implemented MTO-specific Datalogs subscreens and dedicated MTO views within the PCI application.
        <h1>To Conclude...</h1>
        MTO Support was a multi-phase project that required changes across TotalPave&apos;s database architecture, application workflows, and user interfaces.
        <br /><br />
        The Lead Developer and I both made significant contributions throughout the project. Neither of us could claim ownership of the entire effort, as the work crossed multiple areas of the tech stack.
        <br /><br />
        TotalPave&apos;s tech stack was transformed from being built around ASTM D6433 Rev 23 assumptions into a framework that can support any standard. Individual standards still needed to be integrated with TotalPave but this would no longer require redesigns just to support an additional standard.
        <br /><br />
        As a prerequisite project, the Attribute Tables work also improved TotalPave&apos;s synchronization system in the Offline Support architecture. Data conflicts moved from being resolved at the entity level to being resolved at the individual attribute level, allowing the synchronization system to track changes with significantly finer granularity.
    </div>;
}
