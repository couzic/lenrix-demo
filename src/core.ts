import { createProductionDependencies } from './adapters/production/createProductionDependencies'
import { createCore } from './core/Core'

export const core = createCore(createProductionDependencies())
