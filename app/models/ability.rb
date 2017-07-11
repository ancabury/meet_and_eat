class Ability
  include CanCan::Ability

  def initialize(user)
    can :read, :all # users can see every entity in the app

    # requests permissions
    can :create, Request
    can [:update, :destroy], Request do |request|
      request.user_id == user.id && !request.proposals.any?
    end

    # proposals permissions
    can :create, Proposal do |proposal|
      proposal.request.user != user
    end

    can :destroy, Proposal do |proposal|
      proposal.user_id == user.id && !proposal.accepted
    end

    can :accept, Proposal do |proposal|
      proposal.user != user && proposal.request.user == user
    end
  end
end
