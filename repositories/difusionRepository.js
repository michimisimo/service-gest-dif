const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.getDifusion = async () => {
    const { data, error } = await supabase
        .rpc('get_difusion_count');

    if (error) throw new Error(error.message);
    return data;
};

exports.getDetalleDifusion = async (idCampana) => {
    const { data, error } = await supabase
        .from('difusion')
        .select('*')
        .eq('id_campana', idCampana)
    if (error) throw new Error(error.message);
    return data;
}

exports.crearDifusion = async (difusion) => {
    const { data, error } = await supabase
        .from('difusion')
        .insert([difusion])
        .select('id_difusion');

    if (error) throw new Error(error.message);

    return data[0].id_difusion;
};

exports.deleteDifusion = async (rut, idCampana) => {
    const { data, error } = await supabase
        .from('difusion')
        .delete()
        .eq("id_campana", idCampana)
        .eq("rut", rut);

    if (error) throw new Error(error.message);
    return data;
};

