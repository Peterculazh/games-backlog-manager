import React from 'react';
import App from 'next/app';
import '../styles/main.sass';
import { store } from 'src/redux/store';
import { Provider } from 'react-redux';

class MyApp extends App {
    static async getInitialProps({ Component, ctx }: { Component: any, ctx: any }) {

        let pageProps: any = {}
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        return { pageProps }
    }

    render() {

        const { Component, pageProps } = this.props;
        return (
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        )
    }
}


export default MyApp;