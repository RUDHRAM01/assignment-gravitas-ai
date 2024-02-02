const { CreateRecord, GetRecords, UpdateRecord, DeleteRecord, GetRecordById } = require('../controllers/recordController');

const recordRouter = require('express').Router();


recordRouter.post('/create', CreateRecord);
recordRouter.get('/get', GetRecords);
recordRouter.get('/get/:id', GetRecordById);
recordRouter.put('/update/:id', UpdateRecord);
recordRouter.delete('/delete/:id', DeleteRecord);

module.exports = recordRouter;