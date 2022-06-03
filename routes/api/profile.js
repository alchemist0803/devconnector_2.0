const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User');

router.post(
    '/walkerProfile',
    auth,
    async (req, res) => {
        const profile = req.body;

        try {
            let user = await User.findOneAndUpdate(
                { _id: req.user.id },
                [{ $set: { profile: profile } }],
                { new: true }
            );
            return res.json(user);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
    }
);

router.post(
    '/dogProfile',
    auth,
    async (req, res) => {

        const profile = req.body;

        try {
            let user;
            if(req.body.id){
                user = await User.findOneAndUpdate(
                    {_id: req.user.id, "dogProfile._id": profile.id},
                    {$set: {"dogProfile.$": profile}},
                    {new: true})
            }else {
            user = await User.findOneAndUpdate(
                { _id: req.user.id },
                { $push: { dogProfile: profile } },
                { new: true }
            );
        }
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
