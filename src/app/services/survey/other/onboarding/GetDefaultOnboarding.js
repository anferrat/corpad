import { Onboarding } from "../../../../entities/survey/other/Onboarding"

export class GetDefaultOnboarding {
    constructor() {}

    execute() {
        const onboarding = new Onboarding(null, true, true, true, true, true, true)
        return onboarding
    }
}