const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User');

router.post(
    '/',
    auth,
    async (req, res) => {
        const { otherName, message } = req.body;
        try {
            let user = await User.findOne({ _id: req.user.id, "messages.otherName": otherName });
            if (user === null) {
                user = await User.findOneAndUpdate(
                    {_id: req.user.id},
                    {$push: {messages: {otherName: otherName, message: {where: "to", content: message}}}},
                    {new: true}
                );
            }
            else {
                user = await User.findOneAndUpdate(
                    {_id: req.user.id, "messages.otherName": otherName},
                    {$push: {"messages.$.message": {where: "to", content: message}}},
                    {new: true}
                );
            }
            let other = await User.findOne({ name: otherName, "messages.otherName": user.name });
            if (other === null) {
                other = await User.findOneAndUpdate(
                    {name: otherName},
                    {$push: {messages: {otherName: user.name, message: {where: "from", content: message}}}},
                    {new: true}
                );
            }
            else {
                other = await User.findOneAndUpdate(
                    {name: otherName, "messages.otherName": user.name},
                    {$push: {"messages.$.message": {where: "from", content: message}}},
                    {new: true}
                );
            }
            return res.json(user);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
    }
);

router.post(
    '/get',
    auth,
    async (req, res) => {
        const otherName = req.body.otherName;
        try {
            let user = await User.findOne({ _id: req.user.id});
            return res.json(user);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
    }
);

router.delete('/deleteProfile/:id', auth, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id });
        user.dogProfile = user.dogProfile.filter(
            (pro) => pro._id.toString() !== req.params.id
        );
        await user.save();
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
