
import '@Styles/screens/FluxArchitecture.less';

import {Footer} from '@Views/components/Footer';
import {Header} from '@Views/components/Header';

import {ScreenLogic} from '@Logic/ScreenLogic';

export function FluxArchitectureScreen() {
    return <div className={ScreenLogic.getClassName(['FluxArchitecture'])}>
        <Header items={[]} />
        <div className='body'>
        </div>
        <Footer />
    </div>;
}
