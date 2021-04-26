const handleRegister = (req, res, bcrypt, postgres) => {
    const {name, email, password} = req.body;
    const hash = bcrypt.hashSync(password);

    //validate the incoming data not to be empty
    if (!name || !email || !password) {
        return res.status(400).json('Incorrect submission data! ')
    }

    // using returning() from knex return the inserted data instead of create a select query
    postgres.transaction(trx => {
        trx.insert({
            email,
            hash
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
                .returning('*')
                .insert({
                    name: name,
                    email: loginEmail[0],
                    joined: new Date()
                })
                .then(user => res.json(user[0]))
                .catch(() => res.status(400).json('Register Failed! Double check the data!'));
        })
        .then(trx.commit)
        .catch(() => trx.rollback)
    })
}

module.exports = {
    handleRegister: handleRegister
}

