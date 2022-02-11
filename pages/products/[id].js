import React, { useEffect } from 'react';
import Head from 'next/head';
import { makeStyles } from '@mui/styles';
import { useRouter } from 'next/router';
import { CardMedia, Typography } from '@mui/material';


const useStyles = makeStyles(theme => ({
    body: {
        width: '100%',
        height: '100vh',
        backgroundColor: '#F6F6F6',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    root: {
        width: '90%',
        height: '75%',
        display: 'flex',
        borderRadius: 5,
    },

    imageWrapper: {
        width: '27%',
        height: '100%',
        backgroundImage: 'linear-gradient(#69FDC7, #44CACA)',
        position:'relative'
    },
    image: {
        maxWidth: '100%',
        maxHeight: '70%',
        position: 'absolute',
        top: '50%',
        left: '-10%',
        transform: "translate(0%, -50%)",
    },

    content: {
        flex: 1,
        backgroundColor: 'orange'
    }

}));


export default function Product({ product }) {

    //* hook
    const classes = useStyles();
    const router = useRouter();

    console.log(product);

    useEffect(
        () => {
            if (!product) {
                router.push('/404')
            }
        }, []
    )


    return (
        <div className={classes.body}>
            <Head>
                <title>{product.title}</title>
                <meta name="description" content={product.description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={classes.root}>

                <div className={classes.imageWrapper}>

                    <img
                        className={classes.image}
                        src={product.image}
                        alt={product.title}
                    />
                </div>

                <div className={classes.content}>right</div>

            </div>
        </div>
    )
}

export async function getServerSideProps(context) {

    const { params } = context;
    const { id } = params;

    const result = await fetch(`https://fakestoreapi.com/products/${id}`)
        .then(response => response.json())
        .then(data => data);

    return {
        props: {
            product: result
        },
    }
}