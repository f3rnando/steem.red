import React from 'react';
import { Link } from 'react-router';
import TimeAgoWrapper from 'app/components/elements/TimeAgoWrapper';
import Tooltip from 'app/components/elements/Tooltip';
import Icon from 'app/components/elements/Icon';

export default class PostHistoryRow extends React.Component {

    render() {
        let op      = this.props.op;
        console.log( "op: ", op );
        let context = this.props.context; /// account perspective

        let parent_author = op[1].op[1].parent_author;
        let author = op[1].op[1].author;
        let parent_link = "/@" + parent_author;
        let author_link = "/@" + author;
        let parent_perm = op[1].op[1].parent_permlink;
        let permlink = op[1].op[1].permlink;
        let in_reply_to = <span></span>;
        if( parent_author && parent_author != context )
            in_reply_to = <span>en respuesta a <Link to={parent_link}>@{parent_author}</Link></span>;
        else if( parent_author == context )
            in_reply_to = <span><Link to={author_link}>@{author}</Link> respondió a {parent_author}</span>;

        //    const content_markdown = op[1].op[1].body;
        //    const body = (<MarkdownViewer formId={} text={content_markdown} jsonMetadata={} />)
        let post_link = '/' + op[1].op[1].parent_permlink + author_link + '/' + permlink;

        return( <div>

            <div className="row">
                <div className="column small-12" >
                    <h4><Link to={post_link}>{op[1].op[1].title}</Link></h4>
                </div>
            </div>
            <div className="row">
                <div className="column small-12" >
                    <Tooltip t={op[1].timestamp}>
                        <Icon name="clock" className="space-right" />
                        <TimeAgoWrapper date={op[1].timestamp} /> {in_reply_to}
                    </Tooltip>
                </div>
            </div>
        </div>);
    }
};
