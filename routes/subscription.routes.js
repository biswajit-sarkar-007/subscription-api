import { Router } from "express";
const subRouter = Router();

subRouter.get('/',(req,res) => {
    res.send({title: 'GET all subscription'})
})
subRouter.get('/:id',(req,res) => {
    res.send({title: 'GET all subscription detail'})
})
subRouter.post('/',(req,res) => {
    res.send({title: 'CREATE all subscription'})
})
subRouter.put('/:id',(req,res) => {
    res.send({title: 'UPADATE subscription'})
})
subRouter.delete('/:id',(req,res) => {
    res.send({title: 'DELETE  subscription'})
})



subRouter.get('/user/:id',(req,res) => {
    res.send({title: 'GET all user subscription'})
})
subRouter.get('/:id/cancel',(req,res) => {
    res.send({title: 'CANCEL all subscription'})
})
subRouter.get('/upcoming-renewals',(req,res) => {
    res.send({title: 'GET  upcoming renewals'})
})

export default subRouter;