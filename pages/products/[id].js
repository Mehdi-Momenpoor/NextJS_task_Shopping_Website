import React, { useEffect } from 'react';
import Head from 'next/head';
import { makeStyles, styled } from '@mui/styles';
import { useRouter } from 'next/router';
import { Button, CardMedia, Rating, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShareIcon from '@mui/icons-material/Share';

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
        width: '80%',
        height: '75%',
        display: 'flex',
        borderRadius: theme.shape.borderRadius,
    },

    imageWrapper: {
        width: '27%',
        height: '100%',
        backgroundImage: 'linear-gradient(#69FDC7, #44CACA)',
        position: 'relative'
    },
    image: {
        width: '100%',
        height: '70%',
        position: 'absolute',
        top: '50%',
        left: '-10%',
        transform: "translate(0%, -50%)",
    },

    content: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: theme.spacing(4, 3),
        display: 'flex',
        // flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    info: {
        // border: '1px solid red',
        display: 'flex',
        justifyContent: 'space-between'
    },

    description: {
        // border: '1px solid blue',
    },

    footer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    button: {
        background: 'linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)',
        color: 'white',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, 0.3)',
    },

    rating: {
        color: theme.palette.secondary.main,
    }

}));



export default function Product({ product }) {

    //* hook
    const classes = useStyles();
    const router = useRouter();

console.log(product);
    //* useEffect
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

                <div className={classes.content}>

                    <div className={classes.info}>
                        <div>
                            <Typography variant='div' component={'h1'}>{product.title}</Typography>
                            <Typography color='primary' variant="div" component="h5" >{product.category.toUpperCase()}</Typography>
                            <Typography color='secondary'>$ {product.price}</Typography>
                        </div>

                        <Rating
                            className={classes.rating}
                            value={product.rating.rate}
                            precision={0.1}
                            readOnly
                        />
                    </div>

                    <div className={classes.description}>
                        <Typography variant="div" component="h4">DESCRIPTION</Typography>
                        <Typography color='primary' component='p'>{product.description}</Typography>

                    </div>

                    <div className={classes.footer}>
                        <Button
                            startIcon={<ShoppingCartIcon />}
                            variant='outlined'
                            className={classes.button}
                        >
                            add to cart
                        </Button>

                        <ShareIcon color='primary' />

                    </div>

                </div>
            </div>

        </div >
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