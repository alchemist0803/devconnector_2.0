const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const nodemailer = require('nodemailer');

const User = require('../../models/User');

router.post(
    '/create',
    auth,
    async (req, res) => {
        const { formData, id } = req.body;
        try {
            let walker = await User.findOne({ name: id });
            let owner = await User.findOne({ _id: req.user.id });
            const walkers = await User.findOneAndUpdate(
                { name: id },
                {
                    $push: {
                        request: {
                            ownerName: owner.name,
                            walkerName: walker.name,
                            dogName: formData.dogName,
                            deadline: {
                                from: formData.from,
                                to: formData.to,
                            },
                            budget: formData.budget,
                            proposal: formData.proposal
                        }
                    }
                },
                { new: true }
            );
            const owners = await User.findOneAndUpdate(
                { _id: req.user.id },
                {
                    $push: {
                        request: {
                            ownerName: owner.name,
                            walkerName: walker.name,
                            dogName: formData.dogName,
                            deadline: {
                                from: formData.from,
                                to: formData.to,
                            },
                            budget: formData.budget,
                            proposal: formData.proposal,
                        }
                    }
                },
                { new: true }
            )

            return res.json(owners);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
    }
);
router.post(
    '/update',
    auth,
    async (req, res) => {
        const { formData, id } = req.body;
        try {
            let walker = await User.findOne({ name: id });
            let owner = await User.findOne({ _id: req.user.id });
            const walkers = await User.findOneAndUpdate(
                { name: id, "request.dogName": formData.dogName, "request.ownerName": owner.name },
                {
                    $set: {
                        "request.$": {
                            ownerName: owner.name,
                            walkerName: walker.name,
                            dogName: formData.dogName,
                            deadline: {
                                from: formData.from,
                                to: formData.to,
                            },
                            budget: formData.budget,
                            proposal: formData.proposal
                        }
                    }
                },
                { new: true }
            );
            const owners = await User.findOneAndUpdate(
                { _id: req.user.id, "request.dogName": formData.dogName, "request.walkerName": walker.name },
                {
                    $set: {
                        "request.$": {
                            ownerName: owner.name,
                            walkerName: walker.name,
                            dogName: formData.dogName,
                            deadline: {
                                from: formData.from,
                                to: formData.to,
                            },
                            budget: formData.budget,
                            proposal: formData.proposal,
                        }
                    }
                },
                { new: true }
            )

            return res.json(owners);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
    }
);
router.post(
    '/cancel',
    auth,
    async (req, res) => {
        const { walkerName, ownerName, dogName } = req.body;
        try {

            const walker = await User.findOne({ name: walkerName });
            let request = walker.request.find((item) => (item.dogName === dogName && item.ownerName === ownerName))
            request.status = 'canceled'
            walker.save()
            const owner = await User.findOne({ name: ownerName });
            request = owner.request.find((item) => (item.dogName === dogName && item.walkerName === walkerName))
            request.status = "canceled"
            owner.save()
            return res.json(owner);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
    }
);
router.post(
    '/pay',
    auth,
    async (req, res) => {
        const { walkerName, ownerName, dogName, budget } = req.body;
        try {
            let pay;
            const owner = await User.findOne({ name: ownerName });
            if (parseInt(owner.pay) > parseInt(budget)) {
                pay = parseInt(owner.pay) - parseInt(budget);
                owner.pay = pay;
                let request = owner.request.find((item) => (item.dogName === dogName && item.walkerName === walkerName))
                request.status = "done"
                owner.save();
                const walker = await User.findOne({ name: walkerName });
                request = walker.request.find((item) => (item.dogName === dogName && item.ownerName === ownerName))
                request.status = 'done'
                pay = parseInt(walker.pay) + parseInt(budget);
                walker.pay = pay;
                walker.save();
                return res.json(owner);
            }
            else return res
            .status(400)
            .json({ errors: [{ msg: 'Insufficient funds' }] });
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
    }
);
router.post(
    '/accept',
    auth,
    async (req, res) => {
        const { walkerName, ownerName, dogName } = req.body;
        try {
            let walker = await User.findOne({ name: walkerName });
            let request = walker.request.find((item) => (item.dogName === dogName && item.ownerName === ownerName))
            request.status = 'accepted'
            walker.save()
            let owner = await User.findOne({ name: ownerName });
            request = owner.request.find((item) => (item.dogName === dogName && item.walkerName === walkerName))
            request.status = "accepted"
            owner.save()
            walker = await User.findOne({ name: walkerName });
            const from = walker.email;
            owner = await User.findOne({ name: ownerName });
            const to = owner.email;
            const subject = "Your order for dog-"+dogName+" from "+request.deadline.from+"to "+request.deadline.to+" was accepted by dog-walker: "+ request.walkerName+". You can pay now via the website."
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                secure: true,
                auth: {
                    user: 'dog.walker.mailer@gmail.com',
                    pass: '!a123456b!'
                }
            });

            const mailOptions = {
                from: from,
                to: to,
                subject: subject,
            };
            transporter.sendMail(mailOptions, function (err, info) {
                if (err)
                    console.log(err)
                else
                    console.log(info);
            });

            return res.json(walker);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
    }
);
router.post(
    '/refuse',
    auth,
    async (req, res) => {
        const { walkerName, ownerName, dogName } = req.body;
        try {
            let walker = await User.findOne({ name: walkerName });
            let request = walker.request.find((item) => (item.dogName === dogName && item.ownerName === ownerName))
            request.status = 'refused'
            walker.save()
            let owner = await User.findOne({ name: ownerName });
            request = owner.request.find((item) => (item.dogName === dogName && item.walkerName === walkerName))
            request.status = "refused"
            owner.save()
            walker = await User.findOne({ name: walkerName });
            const from = walker.email;
            owner = await User.findOne({ name: ownerName });
            const to = owner.email;
            const subject = "Your order for dog-"+dogName+" from "+request.deadline.from+"to "+request.deadline.to+" was refused by dog-walker: "+ request.walkerName+"."
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                secure: true,
                auth: {
                    user: 'dog.walker.mailer@gmail.com',
                    pass: '!a123456b!'
                }
            });
            const mailOptions = {
                from: from,
                to: to,
                subject: subject,
            };
            transporter.sendMail(mailOptions, function (err, info) {
                if (err)
                    console.log(err)
                else
                    console.log(info);
            });

            return res.json(walker);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
    }
);
module.exports = router;
