const Record = require('../models/record');

const CreateRecord = async (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    try {
        const record = await Record.create({
            title,
            description
        });
        res.status(201).json(record);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}


const GetRecords = async (req, res) => {
    const { id } = req.params;
    try {
        if (id) {
            const record = await Record.findOne({ where: { id } });
            if (!record) {
                return res.status(404).json({ msg: 'Record not found' });
            }
            return res.status(200).json(record);
        }
        const records = await Record.findAll();
        res.status(200).json(records);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const GetRecordById = async (req, res) => {
    const { id } = req.params;
    try {
        const record = await Record.findOne({ where: { id } });
        if (!record) {
            return res.status(404).json({ msg: 'Record not found' });
        }
        res.status(200).json(record);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}


const UpdateRecord = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    try {
        const record = await Record.findOne({ where: { id } });
        if (!record) {
            return res.status(404).json({ msg: 'Record not found' });
        }
        record.title = title;
        record.description = description;
        await record.save();
        res.status(200).json(record);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}



const DeleteRecord = async (req, res) => {
    const { id } = req.params;
    try {
        const record = await Record.findOne({ where: { id } });
        if (!record) {
            return res.status(404).json({ msg: 'Record not found' });
        }
        await record.destroy();
        res.status(200).json({ msg: 'Record deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = { CreateRecord, GetRecords, UpdateRecord, DeleteRecord, GetRecordById };