/**
 * @module sqrs
 */
import { depId, Container } from '../di';
import { Command } from './Command';
import { CommandValidator, commandValidatorId } from './CommandValidator';

/**
 * DependencyIdentifier of CommandValidatorProvider
 */
export const commandValidatorProviderId = depId<CommandValidatorProvider>('CommandValidatorProvider');

/**
 * A function that resolves a command validator by the command type.
 *
 * @param {string} type - command type
 * @interface CommandValidatorProvider
 */
export interface CommandValidatorProvider {
  <T extends string = string>(type: T): CommandValidator<Command<T>> | undefined;
}

/**
 * Creates a function that resolves command validator from the container for a given command by it's type
 *
 * @param {Container} container
 * @returns {CommandHandlerProvider}
 */
export function containerCommandValidatorProviderFactory (container: Container): CommandValidatorProvider {
  return (type) => {
    const id = commandValidatorId(type);
    return container.isBound(id) ? container.get(id) : undefined;
  };
}
