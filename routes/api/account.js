const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const User = require('../../models/User');

router.post(
    '/add',
    check('budget', 'Enter funds correctly.').notEmpty(),
    auth,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { budget } = req.body;
        try {
            const user = await User.findOne({ _id: req.user.id });
            let pay = parseInt(user.pay) + parseInt(budget);
            user.pay = pay;
            user.save();
            return res.json(user);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
    }
);
router.post(
    '/withdraw',
    check('budget', 'Enter funds correctly.').notEmpty(),
    auth,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { budget } = req.body;
        try {
            const user = await User.findOne({ _id: req.user.id });
            if (parseInt(user.pay) > parseInt(budget)){
                let pay = parseInt(user.pay) - parseInt(budget);
                user.pay = pay;
                user.save();
                return res.json(user);
            } else return res
            .status(400)
            .json({ errors: [{ msg: 'Insufficient funds' }] });
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
    }
);
module.exports = router;
