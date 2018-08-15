/*
Copyright 2018 New Vector Ltd

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { _t } from '../../../languageHandler';

export default React.createClass({
    propTypes: {
        // 'hard' if the logged in user has been locked out, 'soft' if they haven't
        kind: PropTypes.string,
        adminContact: PropTypes.string,
        // The type of limit that has been hit.
        limitType: PropTypes.string.isRequired,
    },

    getDefaultProps: function() {
        return {
            kind: 'hard',
        };
    },

    render: function() {
        const toolbarClasses = {
            'mx_MatrixToolbar': true,
        };

        const translateLink = (sub) => {
            if (this.props.adminContact) {
                return <a rel="noopener" target="_blank" href={this.props.adminContact}>{sub}</a>;
            } else {
                return sub;
            }
        };

        let adminContact;
        let limitError;
        if (this.props.kind === 'hard') {
            toolbarClasses['mx_MatrixToolbar_error'] = true;
            adminContact = _t(
                "Please <a>contact your service administrator</a> to continue using the service.",
                {},
                {
                    'a': translateLink,
                },
            );
            if (this.props.limitType === 'monthly_active_user') {
                limitError = _t("This homeserver has hit its Monthly Active User limit.");
            } else {
                limitError = _t("This homeserver has exceeded one of its resource limits.");
            }
        } else {
            toolbarClasses['mx_MatrixToolbar_info'] = true;
            adminContact = _t(
                "Please <a>contact your service administrator</a> to get this limit increased.",
                {},
                {
                    'a': translateLink,
                },
            );
            if (this.props.limitType === 'monthly_active_user') {
                limitError = _t(
                    "This homeserver has hit its Monthly Active User limit so " +
                    "<b>some users will not be able to log in</b>.", {},
                    {'b': sub => <b>{sub}</b>},
                );
            } else {
                limitError = _t(
                    "This homeserver has exceeded one of its resource limits so " +
                    "<b>some users will not be able to log in</b>.", {},
                    {'b': sub => <b>{sub}</b>},
                );
            }
        }
        return (
            <div className={classNames(toolbarClasses)}>
                <div className="mx_MatrixToolbar_content">
                    {limitError}
                    {' '}
                    {adminContact}
                </div>
            </div>
        );
    },
});
