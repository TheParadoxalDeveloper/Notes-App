import { connect } from 'mongoose';
export const dbConnection = connect('mongodb://127.0.0.1:27017/testingData').then(() => {
    console.log('connected to db');
}).catch(() => {
    console.log('error connecting to database')
})
