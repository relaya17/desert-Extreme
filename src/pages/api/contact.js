import dbConnect from '../../lib/mongodb';
import Lead from '../../lib/models/Lead';

export const POST = async ({ request }) => {
  try {
    const data = await request.formData();
    const name = data.get('name');
    const phone = data.get('phone');

    await dbConnect();
    
    const newLead = new Lead({
      name,
      phone,
    });

    await newLead.save();

    return new Response(JSON.stringify({
      message: 'Lead saved successfully'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
