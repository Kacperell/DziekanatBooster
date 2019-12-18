const moment = require('moment')
const {Auth, Database} = require('../../firebase/index')

module.exports = async function addToOrders (req, res) {
    const db = new Database()
    const auth = new Auth()
    const currentUser = await auth.currentUser()
    if (!currentUser) return

    try {
        const timestamp = moment.utc(req.body.requestedTime).local().format().valueOf()
        const response = await db.addToDatabse(currentUser.uid, currentUser.email, timestamp)
        
        if(response.error) {
            res.render('error.pug', {
                message: response.error,
                previousState: '/student'
            })
        } else { 
            res.render('student.pug', {
                email: currentUser.email,
                message: 'UDALO SIE DODAC DO BAZY' 
            });
        }
    } catch (e) {
        return e
    }
}