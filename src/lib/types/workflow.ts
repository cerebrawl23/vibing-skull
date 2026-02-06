import { Database } from './database'
import { ToolCardData } from './tool'

export type Workflow = Database['public']['Tables']['workflows']['Row']
export type WorkflowStep = Database['public']['Tables']['workflow_steps']['Row']

export interface WorkflowWithRelations extends Workflow {
  steps: WorkflowStep[]
  tools: (ToolCardData & { role_in_workflow: string | null; is_required: boolean })[]
}
