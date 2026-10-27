import { useState } from 'react';
import { RulesTable } from './components/RulesTable';
import { RuleEditor } from './components/RuleEditor';
import { mockRules } from './data/mockRules';
import type { RuleSummary } from './types/rule';

type EditorState = {
  rule?: RuleSummary;
};

export default function App() {
  const [rules, setRules] = useState<RuleSummary[]>(mockRules);
  const [editor, setEditor] = useState<EditorState | null>(null);

  const toggleRuleStatus = (ruleId: string) => {
    setRules((currentRules) =>
      currentRules.map((rule) =>
        rule.id === ruleId
          ? { ...rule, isActive: !rule.isActive }
          : rule
      )
    );
  };

  const openCreateRule = () => {
    setEditor({});
  };

  const openEditRule = (rule: RuleSummary) => {
    setEditor({ rule });
  };

  const closeEditor = () => {
    setEditor(null);
  };

  if (editor) {
    return (
      <RuleEditor
        rule={editor.rule}
        onBack={closeEditor}
      />
    );
  }

  return (
    <RulesTable
      rules={rules}
      onToggleRuleStatus={toggleRuleStatus}
      onCreateRule={openCreateRule}
      onEditRule={openEditRule}
    />
  );
}
