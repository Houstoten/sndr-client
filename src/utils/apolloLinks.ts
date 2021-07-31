import {
    createHttpLink,
    split,
} from "@apollo/client";
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { isServer } from '../utils/isServer';
import { onError } from "apollo-link-error";
import { Observable } from "apollo-link";

export const httpLink = createHttpLink({
    uri: '/api'
});

export const wsLink = !isServer && new WebSocketLink({
    uri: `ws://localhost:4000`
});

export const link = !isServer ? split(
    ({ query }) => {
        const { kind, operation }: any = getMainDefinition(query);
        return (
            kind === 'OperationDefinition' &&
            operation === 'subscription'
        );
    },
    wsLink,
    httpLink
) : httpLink;

export const errorLink = (refreshMutation: any) => onError(
    ({ graphQLErrors, operation, forward }) => {
        if (graphQLErrors) {
            for (let err of graphQLErrors) {
                switch (err.extensions.code) {
                    case "UNAUTHENTICATED":

                        if (err.path[0] === 'refreshTokens') {
                            return;
                        }

                        return new Observable(observer => {

                            refreshMutation().then(() => {
                                const subscriber = {
                                    next: observer.next.bind(observer),
                                    error: observer.error.bind(observer),
                                    complete: observer.complete.bind(observer)
                                };

                                return forward(operation).subscribe(subscriber)
                            }).catch(error => {
                                if (location.pathname !== '/hello') {
                                    window.location.replace('/hello')
                                }
                                return observer.error(error);
                            })
                        })
                }
            }
        }
    }
);