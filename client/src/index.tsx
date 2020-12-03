import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {ApolloClient, ApolloProvider, InMemoryCache, split,HttpLink} from "@apollo/client";
import { WebSocketLink } from '@apollo/client/link/ws';
import {getMainDefinition} from "@apollo/client/utilities";


const wsLink = new WebSocketLink({
    uri: `ws://localhost:4001/`,
    options: {
        reconnect: true
    }
});

const httpLink = new HttpLink({
    uri: 'http://localhost:4001/gql'
});

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

export const client = new ApolloClient({
    link:splitLink,
    cache: new InMemoryCache()
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client} >
            <App/>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
