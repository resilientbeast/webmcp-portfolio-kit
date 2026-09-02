import { useEffect } from 'react'
import { registerWebMCPTools } from '../lib/webmcp-tools'

export function usePortfolioWebMCP({ navigate, onActivity, onSkillFilter, onFitMap, onEngagementOptions, onDiscoveryBrief, onContactDraft }) {
    useEffect(() => {
        let active = true
        registerWebMCPTools({ navigate, onActivity, onSkillFilter, onFitMap, onEngagementOptions, onDiscoveryBrief, onContactDraft }).catch(error => {
            if (active) console.warn('Unable to register portfolio WebMCP tools', error)
        })
        return () => { active = false }
    }, [navigate, onActivity, onSkillFilter, onFitMap, onEngagementOptions, onDiscoveryBrief, onContactDraft])
}
