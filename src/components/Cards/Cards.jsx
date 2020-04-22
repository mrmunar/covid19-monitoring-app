import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';

import styles from './Cards.module.css';

const Cards = ({data: { confirmed, recovered, deaths, lastUpdate }}) => {    
    if(!confirmed) {
        return 'Loading...';
    }

    const cardCategories = [
        { title: 'Infected', description: 'active cases', data: confirmed.value, date: lastUpdate, cardCategoryStyle: styles.infected},
        { title: 'Deaths', description: 'deaths caused by', data: deaths.value, date: lastUpdate, cardCategoryStyle: styles.deaths },
        { title: 'Recovered', description: 'recoveries from', data: recovered.value, date: lastUpdate, cardCategoryStyle: styles.recovered },
    ];

    return (
        <div className={styles.container}>
            <Grid container spacing={3} justify="center">
                {
                    cardCategories.map((category) => {
                        return (
                            <Grid item component={Card} xs={12} md={3} className={cx(styles.card, category.cardCategoryStyle)} key={category.title}>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>{category.title}</Typography>
                                    <Typography variant="h5">
                                        <CountUp 
                                            start={0} 
                                            end={category.data} 
                                            duration={3}
                                            separator=","
                                        />
                                    </Typography>
                                    <Typography color="textSecondary">{(new Date(category.date).toDateString())}</Typography>
                                    <Typography variant="body2">Number of {category.description}</Typography>
                                </CardContent>
                            </Grid>
                        );
                    })
                }
            </Grid>
        </div>
    );
}

export default Cards;