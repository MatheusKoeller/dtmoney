import React from 'react';
import ReactDOM from 'react-dom';
import {createServer, Model} from 'miragejs'

import {App} from './App';

createServer({
  
  models: {
    transaction: Model,
  },

  // seeds(server){
  //   server.db.loadData({
  //     transactions:[
  //       {
  //         title: 'Freelancer de websites',
  //         amount: 6000,
  //         type: 'deposit',
  //         category: 'Dev',
  //         createdAt: new Date('2021-05-16 14:50:00'),
  //       },
  //       {
  //         title: 'Aluguel',
  //         amount: -1000,
  //         type: 'withdraw',
  //         category: 'Casa',
  //         createdAt: new Date('2021-05-10 12:00:00'),
  //       }
  //     ]
  //   })  
  // }, 

  routes() {
    this.namespace = 'api';

    this.get("/transactions", () => {
      return this.schema.all("transaction")
    });

    this.post("/transactions", (schema, request)=> {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data)
    });
  },
});


ReactDOM.render( 

  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root') 
);

