import db from './db';

const create_emr = (name, address, medications, birthdate, provider, cb) => {
    const EMR = new db.models.EMR({
            name,
            address,
            medications,
            birthdate,
            provider
        });

    return EMR.save(cb);
};

const display_emr = (emr) => {
    const {name, address, medications, birthdate, provider, _id} = emr;
    return {
        name, address, medications, birthdate, provider, id: _id
    };
}
export default (app, router) => {

    router.route('/emr').get((req, res, next) => {
        db.models.EMR.find().exec((err, result) => {
            if(err){
                console.log('error: ', err);
                res.status(400);
                return res.send("Something wrong.");
            }
            return res.send(result.map(display_emr));
        });
    });

    router.route('/emr/:id').get((req, res) => {
        const _id = req.params.id;

        db.models.EMR.find({_id}).exec((err, result) => {
            if(err){
                console.log('error: ', err);
                res.status(400);
                return res.send("Something wrong.");
            }
            if(result.length === 0){
                return res.status(404).send('Not found.');
            }else{
                return res.send(display_emr(result[0]));
            }
        });

    });

    router.route('/emr').post((req, res) => {
        const emr = create_emr(req.body.name,req.body.address,req.body.medications,req.body.birthdate, req.body.provider,
            (error, result) => {
                if (error) {
                    console.log('error: ', error);
                    res.status(400);
                    return res.send("Something wrong.");
                }

                if(!result){
                    return res.status(500);
                }

                res.status(201);
                return res.send(display_emr(result));


            });

    });

}
