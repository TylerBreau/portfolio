
import '@Styles/components/WorkExample.less';
import {IWorkExampleProps} from '@Interfaces/components/IWorkExample';
import {Link} from 'react-router-dom';

export function WorkExample(props: IWorkExampleProps) {
    return <Link to={props.url}>
        <div className='WorkExample'>
            <span className='title'>{props.title}</span>
            <div className='description'>{props.children}</div>
        </div>
    </Link>;
}
