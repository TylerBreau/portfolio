
import "@Styles/components/TechnicalArticles.less";

import {ITechnicalArticlesProps} from "@Interfaces/components/ITechnicalArticles";
import {TechnicalArticleIndex} from "@Interfaces/components/ITechnicalArticleTile";

import {ComponentLogic} from '@Logic/ComponentLogic';

import {TechnicalArticleTile} from "./TechnicalArticleTile";

export function TechnicalArticles(props: ITechnicalArticlesProps) {
    return <div className={ComponentLogic.getClassName(['TechnicalArticles'], props.className)}>
        <TechnicalArticleTile
            title='TotalPave Offline Support'
            onClick={() => props.onClick(TechnicalArticleIndex.TOTALPAVE_OFFLINE_SUPPORT)}
        >
            <span>Case study of my contributions to TotalPave&apos;s Offline Support system.</span>
            <br />
            <span>Challenges I handled:</span>
            <ul style={{ paddingLeft: '30px' }}>
                <li>Offline-first Architecture</li>
                <li>Bidirectional Synchronization</li>
                <li>Conflict Resolution & Hierarchical Data Merging</li>
                <li>Long-Term Architectural Evolution</li>
            </ul>
        </TechnicalArticleTile>
        <TechnicalArticleTile
            title='TotalPave MTO Support'
            onClick={() => props.onClick(TechnicalArticleIndex.TOTALPAVE_MTO_SUPPORT)}
        >
            <span>Case study of my contributions to supporting a new standard of visual road condition surveys for TotalPave.</span>
            <br />
            <span>Challenges I handled:</span>
            <ul style={{ paddingLeft: '30px' }}>
                <li>Technical Documentation Analysis & Requirements Translation</li>
                <li>Database Redesign</li>
                <li>Major Architectural Redesigns</li>
            </ul>
        </TechnicalArticleTile>
        <TechnicalArticleTile
            title='TotalPave Road Network Renderer'
            onClick={() => props.onClick(TechnicalArticleIndex.TOTALPAVE_ROAD_NETWORK_RENDERER)}
        >
            <span>Case study of designing and implementing a custom road network rendering system.</span>
            <br />
            <span>Topics include:</span>
            <ul style={{ paddingLeft: '30px' }}>
                <li>C++ Data to Image Software</li>
                <li>Bridging C++ with Android and iOS</li>
                <li>Google Maps SDK Tile Layers</li>
            </ul>
        </TechnicalArticleTile>
        <TechnicalArticleTile
            title='Flux Architecture'
            onClick={() => props.onClick(TechnicalArticleIndex.FLUX_ARCHITECURE)}
        >
            <div style={{ textAlign: 'center' }}>Lesson on Flux Architecture</div>
            <ul>
                <li>What is it?</li>
                <li>How to implement it?</li>
                <li>How should it be used?</li>
            </ul>
            <img src='FluxArchitectureImage.png' />
        </TechnicalArticleTile>
    </div>;
}