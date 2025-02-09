import { supabase } from "@/lib/supabase";
let foundIds = {} as any;

async function buildTree(user: any) {
  foundIds[user.id] = true;
  // Fetch completed tasks by this user and their verifiers
  const { data: tasks, error: taskError } = await supabase
    .from('task')
    .select('verifier:verifier_id (id, name)')
    .eq('user_id', user.id)
    .eq('status', 'completed');

  if (!tasks || tasks.length === 0) {
    return ({ name: user.name });
  }

  let children = [];

  for (const item of tasks) {

    if (!foundIds[(item.verifier as any).id]) {
      const child: any = await buildTree(item.verifier);
      children.push(child);

    }
  }

  return { name: user.name, children };
}

export async function getUserTree(userEmail: string) {
  // Fetch the user's name and id
  const { data: user, error: userError } = await supabase
    .from('user')
    .select('id, name')
    .eq('email', userEmail)
    .single();

  if (!user) throw userError;

  return await buildTree(user);

}
