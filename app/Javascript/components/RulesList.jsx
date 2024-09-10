import { HorizontalStack, ResourceItem, ResourceList } from '@shopify/polaris'
import React from 'react'
import EmptyState from '../../../Shared/reusable/EmptyState'

/**
 * Listing for rules
 */
export default function RulesList({ rules, handleModal, handleDelete }) {
  const renderItem = (item) => {
    const { id, child, rule_type } = item
    return (
      <ResourceItem
        id={id}
        verticalAlignment="center"
        accessibilityLabel="Rule details"
        shortcutActions={[
          { content: 'Edit', onAction: () => handleModal(id) },
          {
            content: 'Delete',
            destructive: true,
            onAction: () => handleDelete(id)
          }
        ]}
        persistActions
      >
        <HorizontalStack align="space-between" blockAlign="center" wrap={false}>
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-md">{rule_type}</span>
            <span className="text-sm text-gray-500">{child.title}</span>
          </div>
        </HorizontalStack>
      </ResourceItem>
    )
  }

  return (
    <ResourceList
      resourceName={{ singular: 'rule', plural: 'rules' }}
      items={rules ?? []}
      renderItem={renderItem}
      emptyState={
        <EmptyState title="No rules" description="Add a rule to get started" />
      }
    />
  )
}