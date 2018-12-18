import { createProductionDependencies } from './adapters/createProductionDependencies'
import { createAppCore } from './core/AppCore'

export const core = createAppCore(createProductionDependencies())
