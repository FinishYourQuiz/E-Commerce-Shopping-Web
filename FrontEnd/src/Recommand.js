import React from 'react';
import { Card, Image, Grid, Icon } from 'semantic-ui-react';

const products0 = {
    id: 0,
    title: 'Home ',
    photo: 'https://tse1-mm.cn.bing.net/th?id=OIP.T8Sd4uj2ug1ke-9Mb7j0lAHaQD&w=62&h=110&c=8&rs=1&qlt=90&dpr=1.8&pid=3.1&rm=2',
    description: 'This is a default description for all products',
    price: 14,
    tags: ['gift', 'christmas', 'mom']
}

const products1 = {
    id: 0,
    title: 'Top ',
    photo: 'https://tse1-mm.cn.bing.net/th?id=OIP.T8Sd4uj2ug1ke-9Mb7j0lAHaQD&w=62&h=110&c=8&rs=1&qlt=90&dpr=1.8&pid=3.1&rm=2',
    description: 'This is a default description for all products',
    price: 20,
    tags: ['gift', 'christmas', 'mom']
}
const products2 = {
    id: 0,
    title: 'Skirt ',
    photo: 'https://tse1-mm.cn.bing.net/th?id=OIP.T8Sd4uj2ug1ke-9Mb7j0lAHaQD&w=62&h=110&c=8&rs=1&qlt=90&dpr=1.8&pid=3.1&rm=2',
    description: 'This is a default description for all products',
    price: 25,
    tags: ['gift', 'christmas', 'mom']
}
const products3 = {
    id: 0,
    title: 'Gift ',
    photo: 'https://tse1-mm.cn.bing.net/th?id=OIP.T8Sd4uj2ug1ke-9Mb7j0lAHaQD&w=62&h=110&c=8&rs=1&qlt=90&dpr=1.8&pid=3.1&rm=2',
    description: 'This is a default description for all products',
    price: 7,
    tags: ['gift', 'christmas', 'mom']
}
const products4 = {
    id: 0,
    title: 'Type4 ',
    photo: 'https://tse1-mm.cn.bing.net/th?id=OIP.T8Sd4uj2ug1ke-9Mb7j0lAHaQD&w=62&h=110&c=8&rs=1&qlt=90&dpr=1.8&pid=3.1&rm=2',
    description: 'This is a default description for all products',
    price: 19,
    tags: ['gift', 'christmas', 'mom']
}
const products5 = {
    id: 0,
    title: 'Type5 ',
    photo: 'https://tse1-mm.cn.bing.net/th?id=OIP.T8Sd4uj2ug1ke-9Mb7j0lAHaQD&w=62&h=110&c=8&rs=1&qlt=90&dpr=1.8&pid=3.1&rm=2',
    description: 'This is a default description for all products',
    price: 11,
    tags: ['gift', 'christmas', 'mom']
}
const products6 = {
    id: 0,
    title: 'Type6 ',
    photo: 'https://tse1-mm.cn.bing.net/th?id=OIP.T8Sd4uj2ug1ke-9Mb7j0lAHaQD&w=62&h=110&c=8&rs=1&qlt=90&dpr=1.8&pid=3.1&rm=2',
    description: 'This is a default description for all products',
    price: 20,
    tags: ['gift', 'christmas', 'mom']
}
const products7 = {
    id: 0,
    title: 'Type7 ',
    photo: 'https://tse1-mm.cn.bing.net/th?id=OIP.T8Sd4uj2ug1ke-9Mb7j0lAHaQD&w=62&h=110&c=8&rs=1&qlt=90&dpr=1.8&pid=3.1&rm=2',
    description: 'This is a default description for all products',
    price: 2,
    tags: ['gift', 'christmas', 'mom']
}
const products8 = {
    id: 0,
    title: 'Type8 ',
    photo: 'https://tse1-mm.cn.bing.net/th?id=OIP.T8Sd4uj2ug1ke-9Mb7j0lAHaQD&w=62&h=110&c=8&rs=1&qlt=90&dpr=1.8&pid=3.1&rm=2',
    description: 'This is a default description for all products',
    price: 100,
    tags: ['gift', 'christmas', 'mom']
}
export default class  Recommand extends React.Component {
    constructor(props){
        super(props);
        this.product = products0;
        console.log(this.props.products);
        switch(this.props.products) {
            case 0:
                this.product = products0;   break;
            case 1:
                this.product = products1;   break;
            case 2:
                this.product = products2;   break;
            case 3:
                this.product = products3;   break;
            case 4:
                this.product = products4;   break;
            case 5:
                this.product = products5;   break;
            case 6:
                this.product = products6;   break;
            case 7:
                this.product = products7;   break;
            case 8:
                this.product = products8;   break;
        }
    }

    render(){
        return(
            <Grid columns={7} centered style={{paddingLeft: '3vw', paddingRight: '3vw'}}>
            {[1,2,3,4,5,6,7,8,9,10].map( index => 
                <Grid.Column>
                    <Card style={{
                        height: '20vw', 
                        backgroundColor: '', 
                        maxWidth:'11vw',
                        boxShadow: '0.5px 3px 2.5px 1px #8a817c',
                    }}>
                        <Image centered>
                            <img style={{height: '11vw', width:'12vw', boxShadow: '1px -2px 2px 1px black'}}  src={this.product.photo}></img>
                        </Image>
                        <div style={{margin:'1vw', marginBottom:'0px'}}>
                            <div style={{
                                fontSize: '1.2vw', 
                                fontWeight: 'bold', 
                                display: "flex", 
                                flexDirection: "row", 
                                justifyContent:'space-between',
                                alignItems: 'center',
                            }}>
                                <div>{this.product.title+index}</div>
                                <div style={{fontSize: '1.6vw', fontWeight: 'bold', color:'#774936'}}>${this.product.price * (index+1)}</div>
                            </div>
                            <div style={{fontSize: '0.8vw', color:'gray'}}>{this.product.description}</div>
                            <div>
                            {this.product.tags.map(tag =>
                                <a style={{fontSize: '0.8vw', color:'#c38e70',}}>
                                    {tag+' '}
                                </a>
                            )}
                            </div>
                        </div>
                    </Card>
                </Grid.Column>
            )}
            </Grid>
        )
    }
}
