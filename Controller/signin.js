const handleSignin = (req, res, postgres, bcrypt) => {
    const { email, password } = req.body;

    //validate the incoming data not to be empty
    if (!email || !password) {
        return res.status(400).json('Incorrect submission data! ')
    }

    postgres.select('email', 'hash').from('login').where({ email })
        .returning('*')
        .then(user => {
            const isValid = bcrypt.compareSync(password, user[0].hash)
            if (isValid) {
                postgres.select('*').from('users').where({ email })
                .then(user => res.json(user[0]))
                .catch(() => res.status(400).json('Unable to get the user!'));
            } else
            res.status(400).json('Error logging in ..');
        })
        .catch(() => res.json("Wrong credentials!"));
}

module.exports = {
    handleSignin: handleSignin
}