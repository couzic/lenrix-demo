import { createAppCore } from './core/AppCore'
import { createProductionDependencies } from './core/AppDependencies'

export const core = createAppCore(createProductionDependencies())
