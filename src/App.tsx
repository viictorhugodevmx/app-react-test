import { useState } from 'react';

import { RulesTable } from './components/RulesTable';
import { RuleEditor } from './components/RuleEditor';
import { mockRules } from './data/mockRules';

import type { Rule, RuleSummary } from './types/rule';

type EditorState = {
  rule?: Rule;
};

export default function App() {
  const [rules, setRules] = useState<Rule[]>(() =>
    mockRules.map((mockRule) => ({
      ...mockRule,
      conditionLogic: 'AND',
      conditions: [],
      actions: [],
    }))
  );

  const [editor, setEditor] = useState<EditorState | null>(null);

  const [successMessage, setSuccessMessage] =
    useState<string | null>(null);

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
    setSuccessMessage(null);
    setEditor({});
  };

  const openEditRule = (selectedRule: RuleSummary) => {
    const ruleToEdit = rules.find(
      (rule) => rule.id === selectedRule.id
    );

    if (!ruleToEdit) {
      return;
    }

    setSuccessMessage(null);
    setEditor({ rule: ruleToEdit });
  };

  const closeEditor = () => {
    setEditor(null);
  };

  const saveRule = (updatedRule: Rule): string | null => {
    const normalizedName = updatedRule.name
      .trim()
      .toLocaleLowerCase('es');

    const isDuplicateName = rules.some(
      (rule) =>
        rule.id !== updatedRule.id &&
        rule.name.trim().toLocaleLowerCase('es') ===
          normalizedName
    );

    if (isDuplicateName) {
      return 'Ya existe una regla con este nombre.';
    }

    const isExistingRule = rules.some(
      (rule) => rule.id === updatedRule.id
    );

    setRules((currentRules) =>
      isExistingRule
        ? currentRules.map((rule) =>
            rule.id === updatedRule.id ? updatedRule : rule
          )
        : [...currentRules, updatedRule]
    );

    setSuccessMessage(
      isExistingRule
        ? 'La regla se actualizó correctamente.'
        : 'La regla se creó correctamente.'
    );

    setEditor(null);

    return null;
  };

  if (editor !== null) {
    return (
      <RuleEditor
        rule={editor.rule}
        onBack={closeEditor}
        onSave={saveRule}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {successMessage && (
        <div
          role="status"
          className="mx-auto max-w-5xl px-4 pt-6 sm:px-6"
        >
          <p className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
            {successMessage}
          </p>
        </div>
      )}

      <RulesTable
        rules={rules}
        onToggleRuleStatus={toggleRuleStatus}
        onCreateRule={openCreateRule}
        onEditRule={openEditRule}
      />
    </div>
  );
}
