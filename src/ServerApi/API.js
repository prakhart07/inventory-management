import { supabase } from "../ServerApi/Dbconnection";

export  async function getProject(){
    const res = await supabase
  .from('Project')
  .select('*');
  return res 
}
export async function addProject(data){
  
    const res = await supabase
  .from('Project')
  .insert([
    { project_name: data.project_name, project_location: data.project_location ,
      start_date: data.start_date, plot_size: data.plot_size, 
      project_type: data.project_type, duration: data.duration},
  ])
  .select()
  return res
}