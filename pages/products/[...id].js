import React from 'react';
import Head from 'next/head';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100vh',
        backgroundColor: '#ccc'
    }
}));


export default function Product() {

    const classes = useStyles();
    return (
        <div className={classes.root}>
            {/* <div> */}
            <Head>
                <title>{`title`}</title>
                <meta name="description" content={`description`} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            Product page
        </div>
    )
}
